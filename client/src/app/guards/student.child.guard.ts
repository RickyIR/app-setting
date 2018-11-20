import { AuthorizationService } from './../services/authorization.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentChildGuard implements CanActivateChild {

  constructor(private auth: AuthorizationService, private router: Router){}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if(this.auth.isAuthenticated()){
        return true;
      }

      this.router.navigate(['/authentication']);

    return true;
  }
}
