import { Component, Input, ViewChild } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: "app-navbar",
    templateUrl: "navbar.component.html",
    styleUrls: ["navbar.component.scss"]
})
export class NavbarComponent {
    @ViewChild('nav') public nav;
    @Input() public items;

    public userMail = localStorage.getItem("user_email");
    public player: any;

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
}
