import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, Account, Coin } from 'app/shared/models';
import { RouterService, CoinsService, PromptsService, SearchService } from 'app/core';
import { MatDialog } from '@angular/material';
import { NewAccountPromptComponent } from 'app/shared/entry-components';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountsComponent {
  constructor(
    private searchService: SearchService,
    private promptsService: PromptsService,
    public dialog: MatDialog,
    private coinsService: CoinsService,
    private routerService: RouterService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  @Input()
  public accounts: Account[];

  public accountsForView: Account[] = [];

  @Input()
  public coin: Coin;

  public showClaimed: boolean = false;

  ngOnInit() {
    this.searchService.searchParentSource$.subscribe((text: string) => {
      this.accountsForView = this.accounts.filter(account => {
        let hasText: boolean = true;
        if (text) {
          hasText = account.email.toLowerCase().indexOf(text) != -1;
        }
        return hasText;
      });
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.accounts) {
      if (this.isNewChange(changes.accounts)) {

        this.accounts = this.accounts.sort((account1: Account, account2: Account) => {
          if (account1.totalCoins < account2.totalCoins) {
            return 1;
          }
          else if (account1.totalCoins > account2.totalCoins) {
            return -1;
          }
          else {
            return 0;
          }
        });

        this.toggleClaimed(false);
      }
    }
  }

  private isNewChange(change: any) {
    let prev = JSON.stringify(change.previousValue);
    let current = JSON.stringify(change.currentValue);

    return prev != current;
  }

  addAccount() {
    this.showDialogue(async (account: Account) => {
      if (account) {
        await this.coinsService.addAccount(account, this.coin.id);
        this.promptsService.showToast('account added successfully');
      }
    });
  }

  editAccount(account: Account) {
    this.showDialogue(async (account: Account) => {
      if (account) {
        await this.coinsService.updateAccount(account, this.coin.id);
        this.promptsService.showToast('account updated successfully');
      }
    }, account);
  }

  deleteAccount(account: Account) {
    this.promptsService.showDialogue(
      'Are you sure',
      'Note you may loose track of your coin on this account!',
      async (confirm) => {
        if (confirm) {
          await this.coinsService.deleteAccount(account.id, this.coin.id);
          this.promptsService.showToast('account deleted successfully');
        }
      }
    );
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

  maskPassword(pass: string) {
    return '*'.repeat(pass.length);
  }

  promptCopy(text: string) {
    this.promptsService.showToast(text);
  }

  toggleClaimed(event) {
    this.accountsForView = this.accounts.filter(account => account.claimed == event);
  }
}
