import { Component, OnInit } from '@angular/core';
import { MenuItem, Coin, Account } from 'app/shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterService, CoinsService } from 'app/core';
import { format } from 'date-fns';

@Component({
  selector: 'app-portfolio-start',
  templateUrl: './portfolio-start.component.html',
  styleUrls: ['./portfolio-start.component.css']
})
export class PortfolioStartComponent implements OnInit {
  private menuItem: MenuItem = {
    'title': 'Total worth: $0.00',
    'showAll': false,
    'backButtonEnabled': false,
    'searchEnabled': false,
    'searchActive': false,
    'submenuItems': [{ 'title': 'logout', 'route': 'auth', 'icon': 'power_settings_new' }]
  }

  private coins: Coin[] = [];
  public coinListForTable: any[] = [];
  public tableProperties: string[] = [
    'S/N',
    'Name',
    'Symbol',
    'Price',
    'Release Date',
    'Total Owned',
    'Worth'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coinsService: CoinsService,
    private routerService: RouterService,
  ) { }

  async ngOnInit() {
    // get coinlist for player
    this.coinsService.getAllCoins().subscribe((coins: Coin[]) => {
      this.coins = coins;
      this.computeCoinListForTable();
    });
  }

  computeCoinListForTable() {
    this.coinListForTable = [];

    this.coins.forEach((coin: Coin, index: number) => {
      let data = {
        'S/N': index + 1,
        'Name': coin.name,
        'Symbol': coin.symbol,
        'Price': coin.price,
        'Release Date': coin.releaseDate.toLocaleDateString(),
        'Total Owned': 0,
        'Worth': 0,
        'id': coin.id,
        'logo': coin.logoUrl
      };

      this.coinListForTable.push(data);
      this.computeTotalOwned(data);
    });
  }

  computeTotalOwned(data: any) {
    this.coinsService.getCoinAccounts(data.id).subscribe((coinsAccounts: Account[]) => {
      let totalCoins: number = 0;
      
      coinsAccounts.forEach((account: Account) => {
        totalCoins += account.totalCoins;
      });
      
      let worth: string = (totalCoins * data['Price']).toFixed(2);
      data['Total Owned'] = `${totalCoins} $${data['Symbol']}`;
      data['Worth'] = worth;

      this.menuItem.title = `Total worth: ${worth} USD`;
      this.routerService.setMainMenuItem(this.menuItem);
    });
  }

  gotoCoin(e: any) {
    this.router.navigate(['../summaryDetails', e.id], { relativeTo: this.route });
  }

}
