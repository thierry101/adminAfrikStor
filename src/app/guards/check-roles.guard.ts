import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { roles } from 'src/app/shared/shared';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CheckRolesGuard implements CanActivate {

  constructor(private route: Router, private authService: AuthenticationService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthorized(route);
  }

  private isAuthorized(route: ActivatedRouteSnapshot): boolean {
    const allRoles = roles;
    const expectedRoles = route.data['expectedRoles']; //tis is the role that we define in url to get access
    const roleMatches = allRoles.findIndex(role => expectedRoles.indexOf(role) !== -1);
    return (roleMatches < 0) ? false : true
  }

}