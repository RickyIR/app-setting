import { AuthorizationService } from './../services/authorization.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthorGuard implements CanActivate {

  constructor(private auth: AuthorizationService, private router: Router, private cookiesService: CookieService){

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.auth.isAuthenticated()){
      if(this.auth.isAuthenticatedAsAuthor()){
        return true;
      }

      this.router.navigate(['/workshop']);

      return false;
    }

    this.router.navigate(['/authentication']);

    return false;
  }
}
