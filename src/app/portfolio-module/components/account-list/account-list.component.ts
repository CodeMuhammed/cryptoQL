import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, Account, Coin } from 'app/shared/models';
import { RouterService, CoinsService, PromptsService} from 'app/core';
import { MatDialog } from '@angular/material';
import { NewAccountPromptComponent } from 'app/shared/entry-components';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountsComponent {
  constructor(
    private promptsService: PromptsService,
    public dialog: MatDialog,
    private coinsService: CoinsService,
    private routerService: RouterService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  @Input()
  public accounts: Account[];

  @Input()
  public coin: Coin;

  getAccountsProperty() {
    return ['email', 'totalCoins', 'password'];
  }

  addAccount() {
      this.showDialogue(async (account: Account) => {
        if(account) {
          await this.coinsService.addAccount(account, this.coin.id);
          this.promptsService.showToast('account added successfully');
        }
      });
  }

  showDialogue(handler: any, account?: Account) {
    let dialogRef = this.dialog.open(NewAccountPromptComponent, {
      width: '500px',
      data: { 
        coinName: this.coin.name,
        account
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && handler) {
        handler(result);
      }
    });
  }

}


// to take snapshot command + shift + 3