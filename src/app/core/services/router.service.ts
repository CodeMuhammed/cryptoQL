import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import {MenuItem} from 'app/shared/models/menuItem';


// shared searchService for common search functions
// to be shared within trainerComponent + child modules
@Injectable()
export class RouterService {
    private observer$: Observer<MenuItem>;
    // Observable string sources
    public routerMenuItemSource = new Subject<string>();
    public mainMenuItemSource = new Subject<MenuItem>();

    // Observable string streams
    public routerMenuItemSource$ = this.routerMenuItemSource.asObservable();
    public mainMenuItemSource$ = this.mainMenuItemSource.asObservable();

    public constructor() { }

    // Service message commands
    public setRouterMenuItem(routerMenuItem: string) {
        this.routerMenuItemSource.next(routerMenuItem);
    }

    public setMainMenuItem(mainMenuItem: MenuItem) {
        this.mainMenuItemSource.next(mainMenuItem);
    }

}
