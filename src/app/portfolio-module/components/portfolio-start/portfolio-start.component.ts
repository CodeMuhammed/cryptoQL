import { Component, OnInit } from '@angular/core';
import { MenuItem, Coin } from 'app/shared/models';
import { RouterService } from 'app/core';

@Component({
  selector: 'app-portfolio-start',
  templateUrl: './portfolio-start.component.html',
  styleUrls: ['./portfolio-start.component.css']
})
export class PortfolioStartComponent implements OnInit {
  private menuItem: MenuItem = {
    'title': 'Total worth: $73,047.00',
    'showAll': false,
    'backButtonEnabled': false,
    'searchEnabled': false,
    'searchActive': false,
    'submenuItems': [{ 'title': 'logout', 'route': 'auth', 'icon': 'power_settings_new' }]
  }

  public coinList: Coin[] = []

  constructor(
        private routerService: RouterService,
  ) { }

  async ngOnInit() {
    this.routerService.setMainMenuItem(this.menuItem);
  }

  getTableProperties() {
    return [
      'S/N',
      'Name',
      'Price',
      'Release Date',
      'Total Owned',
      'Worth'
    ];
  }

  gotoCoin(e: any) {

  }

}
