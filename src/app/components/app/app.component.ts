import { Component } from "@angular/core";
import { AuthService, UserService } from 'app/core';
import { User } from 'app/shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public routes: any[];
  public user: User;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.authState$.onAuthStateChanged(async (auth) => {
      if (auth) {
        this.routes = [
          { name: 'Portfolio', path: 'portfolio', icon: 'card_giftcard' },
          { name: 'coinList', path: 'coinlist', icon: 'monetization_on' }
        ]
        let email = localStorage.getItem('user_email');
        this.user = await this.userService.getUserByEmail(email);
      }
    });
  }
}
