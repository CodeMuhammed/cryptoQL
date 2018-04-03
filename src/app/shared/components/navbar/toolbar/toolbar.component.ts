import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { RouterService } from 'app/core';
import { MenuItem } from 'app/shared/models/menuItem';
@Component({
    selector: 'app-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['toolbar.component.css']
})
export class ToolbarComponent implements OnDestroy, OnInit {

    @Input() public nav: any;
    @Input() public toggleMenuButton: boolean;

    public subscriptionList: Subscription[] = [];
    public menuItem: MenuItem;
    public showAllState: boolean;

    public constructor(
        private routerService: RouterService,
        private location: Location
    ) { }

    protected open() {
        this.nav.toggle().then((res) => {
            if(res) {
                if (res.type === 'open') {
                    return false;
                }
            }
            return true;
        });
    }

    public ngOnInit() {
        this.subscriptionList.push(
            this.routerService.mainMenuItemSource$.subscribe(
                mainMenuItem => {
                    this.menuItem = mainMenuItem;
                })
        );
    }

    // show / hide search pannel
    protected enableSearchBar() {
        if (!this.menuItem.searchActive) {
            this.menuItem.searchEnabled = false;
            this.menuItem.searchActive = true;
        } else {
            this.menuItem.searchActive = false;

        }
    }

    // click on back button
    protected goBack() {
        this.location.back();
    }

    public ngOnDestroy() {
        this.subscriptionList.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }
}
