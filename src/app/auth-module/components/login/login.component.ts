import { Component, OnInit } from '@angular/core';
import { AuthService, RouterService, UserService } from 'app/core';
import { Router } from "@angular/router";
import { MenuItem, User } from 'app/shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private menuItem: MenuItem = {
    'title': '',
    'showAll': false,
    'backButtonEnabled': false,
    'searchEnabled': false,
    'searchActive': false,
    'submenuItems': [{ 'title': 'logout', 'route': 'auth', 'icon': 'power_settings_new' }]
  }

  constructor(
    private router: Router,
    private userService: UserService,
    private routerService: RouterService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.routerService.setMainMenuItem(this.menuItem);
  }

  async login() {
    let authState: any = await this.authService.loginSocial('google');
    let authProfile: any = authState.additionalUserInfo.profile;
    let newUser: User = {
      firstname: authProfile.family_name,
      lastname: authProfile.given_name,
      fullname: authProfile.name,
      picture: authProfile.picture,
      email: authProfile.email,
      active: true,
      uid: authState.user.uid
    };

    let user: User = await this.userService.getUserByEmail(newUser.email);

    if(!user) {
      let userRef: any = await this.userService.saveUser(newUser);
      user.id = userRef.id;
    }

    this.setCookiesInLocalstorage(user);
    this.router.navigateByUrl('/portfolio');
  }

  setCookiesInLocalstorage(user: User) {
    localStorage.setItem('user_id', user.id);
    localStorage.setItem('user_email', user.email);
  }
}
