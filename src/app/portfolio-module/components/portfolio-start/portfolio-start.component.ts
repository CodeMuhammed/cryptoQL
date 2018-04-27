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
  public coinListForTableView: any[] = [];
  private overAllTotal: number = 0;
  public tableHeaders: any[] = [
    {
      name: 'Symbol'
    },
    {
      name: 'Price',
      sortProperty: 'price',
      direction: ''
    },
    {
      name: 'Release',
      sortProperty: 'releaseDate',
      direction: ''
    },
    {
      name: 'Total',
      sortProperty: 'totalOwned',
      direction: ''
    },
    {
      name: 'Worth',
      sortProperty: 'worth',
      direction: ''
    },
    {
      name: ''
    },
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
    this.coinListForTableView = []

    this.coins.forEach((coin: Coin, index: number) => {
      let data = {
        name: coin.name,
        symbol: coin.symbol,
        price: coin.price,
        releaseDate: coin.releaseDate.toLocaleDateString(),
        totalOwned: 0,
        worth: 0,
        id: coin.id,
        logo: coin.logoUrl,
        websiteUrl: coin.websiteUrl
      };

      this.coinListForTable.push(data);
      this.computeTotalOwned(data);
    });

    this.coinListForTableView = this.coinListForTable.slice();
  }

  computeTotalOwned(data: any) {
    this.overAllTotal = 0;

    this.coinsService.getCoinAccounts(data.id).subscribe((coinsAccounts: Account[]) => {
      let totalCoins: number = 0;

      coinsAccounts.forEach((account: Account) => {
        totalCoins += account.totalCoins;
      });

      let worth: string = (totalCoins * data.price).toFixed(2);
      data.totalOwned = totalCoins;
      data.worth = worth;

      this.overAllTotal += parseFloat(worth);

      this.menuItem.title = `Total worth: ${this.overAllTotal} USD`;
      this.routerService.setMainMenuItem(this.menuItem);
    });
  }

  gotoCoin(e: any) {
    this.router.navigate(['../summaryDetails', e.id], { relativeTo: this.route });
  }

  circleSort(header) {
    let sortStates = ['asc', 'desc', ''];

    // we reset the other sort headers
    this.tableHeaders = this.tableHeaders.map((item) => {
      if (header.sortProperty !== item.sortProperty) {
        item.direction = '';
      }

      return item;
    });

    let sortIndex = sortStates.indexOf(header.direction) + 1;
    header.direction = sortStates[sortIndex % sortStates.length];

    // use that property to sort the array of data
    this.coinListForTableView = this.coinListForTable.slice();

    if (header.direction) {
      switch(header.direction) {
        case 'asc': {
          this.coinListForTableView = this.sortAscending(this.coinListForTableView, header);
          break;
        }

        case 'desc': {
          this.coinListForTableView = this.sortDescending(this.coinListForTableView, header);
          break;
        }
      }
    }
  }

  sortAscending(dataset, header) {
    return dataset.sort((a, b) => {
      a = a[header.sortProperty];
      b = b[header.sortProperty];

      if (a < b) {
        return -1;
      }
      else if (a > b) {
        return 1;
      }
      else {
        return 0;
      }
    });
  }

  sortDescending(dataset, header) {
    return dataset.sort((a, b) => {
      a = a[header.sortProperty];
      b = b[header.sortProperty];

      if (a > b) {
        return -1;
      }
      else if (a < b) {
        return 1;
      }
      else {
        return 0;
      }
    });
  }
}
