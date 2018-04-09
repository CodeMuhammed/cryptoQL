import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'app/shared/models';
import { RouterService } from 'app/core';

@Component({
  selector: 'app-coinpage',
  templateUrl: './coinpage.component.html',
  styleUrls: ['./coinpage.component.css']
})
export class CoinPageComponent implements OnInit {
  constructor(
    private routerService: RouterService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  public coinId: string = '';
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
     this.route.params.subscribe((params) => {
        this.coinId = params.id;

        switch(this.coinId ) {
          case '1': {
            this.showAccounts = false;
            this.menuItem.title = 'New Coin Form';
            this.routerService.setMainMenuItem(this.menuItem);
          }
          default: {
            // @TODO, the title should reflect the total worth of the coin
          }
        }
     });
  }

}
