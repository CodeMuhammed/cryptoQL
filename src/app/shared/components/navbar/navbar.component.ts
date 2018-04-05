import { Component, Input, ViewChild } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: "app-navbar",
    templateUrl: "navbar.component.html",
    styleUrls: ["navbar.component.scss"]
})
export class NavbarComponent {
    @ViewChild('nav') public nav;
    @Input() public routes;
    @Input() public user;

    constructor(private router: Router) { }
    ngOnInit() { }

    public isOver(): boolean {
        return window.matchMedia(`(max-width: 960px)`).matches;
    }

    protected closeNav() {
        if (this.isOver()) {
            this.nav.close();
        }
    }

    public formatUserEmail(email: string) {
        let ttlIndex = email.indexOf('@');
        let ttl = email.substr(ttlIndex);
        let domain = email.substr(0, ttlIndex);
        let rest = domain.length > 8 ? '...' : '';

        email = domain.substr(0, 8) + rest + ttl;

        return email;
    }
}

//logomakr.com/62bG2V
