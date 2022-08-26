import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../_services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class IsloggedoutGuard implements CanActivate {
  constructor(private authS: AuthenticationService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authS.isLoggedIn()) return true;
    console.log('you will need to loggout first to change page!')
    return false;
  }
}
