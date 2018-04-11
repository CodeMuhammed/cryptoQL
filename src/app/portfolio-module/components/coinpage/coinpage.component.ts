import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, Account, Coin } from 'app/shared/models';
import { RouterService, CoinsService } from 'app/core';

@Component({
  selector: 'app-coinpage',
  templateUrl: './coinpage.component.html',
  styleUrls: ['./coinpage.component.css']
})
export class CoinPageComponent implements OnInit {
  constructor(
    private coinsService: CoinsService,
    private routerService: RouterService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public accounts: Account[] = [];
  public coin: Coin;
  public showAccounts: boolean = true;
  private menuItem: MenuItem = {
    'title': '',
    'showAll': false,
    'backButtonEnabled': true,
    'searchEnabled': false,
    'searchActive': false,
    'submenuItems': [{ 'title': 'logout', 'route': 'auth', 'icon': 'power_settings_new' }]
  }

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      let coinId: string = params.id
      this.coin = await this.coinsService.getCoin(params.id).take(1).toPromise();

      switch (coinId) {
        case '1': {
          this.showAccounts = false;
          this.menuItem.title = 'New Coin Form';
          this.routerService.setMainMenuItem(this.menuItem);

          break;
        }
        default: {
          this.coinsService.getCoinAccounts(coinId)
            .subscribe((accounts: Account[]) => {
              let totalCoins = 0;
              this.accounts = accounts;

              this.accounts.forEach((account: Account) => {
                totalCoins += account.totalCoins;
              });

              // we set the title of this coin page
              let priceUSD: string = (totalCoins * this.coin.price).toFixed(2);
              this.menuItem.title = `${totalCoins} ${this.coin.symbol} ~ $${priceUSD}`;
              this.routerService.setMainMenuItem(this.menuItem);
            });

            break;
        }
      }
    });
  }

}
