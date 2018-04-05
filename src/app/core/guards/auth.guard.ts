import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private auth: AuthService, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(!this.auth.isLoggedIn()) {
      this.auth.redirectUrl = state.url;
      this.router.navigate(["/auth"]);
    }

    return this.auth.isLoggedIn();
  }
}
