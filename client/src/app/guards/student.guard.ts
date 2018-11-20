import { CookieService } from 'ngx-cookie';
import { AuthorizationService } from './../services/authorization.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {
  constructor(private auth: AuthorizationService, private router: Router){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this.auth.isAuthenticated()){
      return true;
    }

    this.router.navigate(['/authentication']);

    return true;
  }
}
