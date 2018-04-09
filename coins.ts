import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { HttpService } from './http.service'; 

@Injectable()
export class CoinsService {
  private coincapUrl: string = 'https://coincap.io/front';
  private cryptocompareUrl: string = 'https://cors-anywhere.herokuapp.com/https://min-api.cryptocompare.com/data/all/coinlist';
  public coinsData: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private httpService: HttpService) { 
      this.processDataSets();
  }

  private async processDataSets() {
      const coinCapData: any = await this.prepareCoinCapData();
      const cryptoCompareData: any = await this.prepareCryptocompareData();
      const coinDataSet: any = this.mergeDataSources(coinCapData, cryptoCompareData);

      let coinsDataAsArray: any[] = Object.keys(coinDataSet).map((key) => {
          let data = coinDataSet[key];
          data.key = key;

          return data;
      });

      this.coinsData.next(coinsDataAsArray);     
  }

  private mergeDataSources(coinCap: any, cryptoCompare: any) {
      let mergedData: any = {};

      Object.keys(coinCap).forEach((key) => {
          let coinDataFromCoinCap: any = coinCap[key];
          let coinDataFromCryptoCompare: any = cryptoCompare[key];

          if(coinDataFromCoinCap && coinDataFromCryptoCompare) {
              mergedData[key] = Object.assign({}, coinDataFromCoinCap, coinDataFromCryptoCompare)
          }
      });

      return mergedData;
  }

  private prepareCryptocompareData(): Promise<any> {
      return new Promise(async (resolve) => {
          const rawDataSet: any = await this.httpService.get(this.cryptocompareUrl);
          const baseImageUrl: string = rawDataSet.BaseImageUrl;
          const BaseLinkUrl: string = rawDataSet.BaseLinkUrl;

          Object.keys(rawDataSet.Data).forEach((key: string) => {
              rawDataSet.Data[key].ImageUrl = BaseLinkUrl + rawDataSet.Data[key].ImageUrl;
              rawDataSet.Data[key].Url = BaseLinkUrl + rawDataSet.Data[key].Url;
          });

          return resolve(rawDataSet.Data);
      });
  }

  private prepareCoinCapData(): Promise<any> {
      return new Promise(async (resolve) => {
         const rawDataSet: any = await this.httpService.get(this.coincapUrl);
         let result: any = {};

         rawDataSet.forEach((data) => {
             result[data.short] = data;
         });

         return resolve(result);
      });
  }

}
