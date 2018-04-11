import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class NoAuthGuard implements CanActivate {
  public constructor(private auth: AuthService, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.auth.isLoggedIn()) {
      this.router.navigate(["/portfolio"]);
    }

    return !this.auth.isLoggedIn();
  }
}
