import { OnChanges } from '@angular/core';
import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import { SubMenuItem } from 'app/shared/models/submenuItem';
import { AuthService } from 'app/core'

@Component({
    selector: 'app-submenu',
    templateUrl: 'submenu.component.html',
    styleUrls: ['submenu.component.css']
})
export class SubmenuComponent {

    @Input()
    public submenu: SubMenuItem;

    public constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    public handleClick(subMenu, route) {
        if (subMenu === 'logout') {
            localStorage.clear();
            this.authService.logout();
        }

        if (route) {
            this.router.navigateByUrl(`${this.router.url}/${route}`);
        }
    }

}
