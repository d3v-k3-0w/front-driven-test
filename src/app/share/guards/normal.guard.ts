import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class NormalGuard implements CanActivate {
  constructor(private loginSrvc: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let userRole = this.loginSrvc.getUserRole();
    if (this.loginSrvc.isLoggedIn() && userRole && userRole === 'USER') {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
