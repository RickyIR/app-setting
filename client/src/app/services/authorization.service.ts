import { Response } from './../interface/response';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UploadService } from './upload.service';
import { User } from './../interface/user';
import { Injectable } from '@angular/core';

import swal from 'sweetalert2';
import { ResponsePaginated } from '../interface/response';
import { CookieService } from 'ngx-cookie';
import { AriaService } from './aria.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private api_link: string;

  constructor(private upload: UploadService, private cookiesService: CookieService, private http: HttpClient, private aria: AriaService, private router: Router) {
    this.api_link = this.upload.api_link;
   }

  public login(code: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<Response>(`${this.api_link}/authentication`, JSON.stringify({password: code}), httpOptions).pipe(
      map((res) => {
        if(res && res.status == 200){
          const expires_at = JSON.stringify((res.data.expiresIn) + new Date().getTime());

          localStorage.setItem('sessionId', res.data.sessionsID);
          localStorage.setItem('expires_at', expires_at);
          localStorage.setItem('isAuthor', res.data.isAuthor || false);

          return 200;
        }else{
          localStorage.removeItem('sessionId');
          localStorage.removeItem('expires_at');
          localStorage.removeItem('isAuthor');

          return 401;
        }
      }),
      catchError((res: HttpErrorResponse) => {
        this.aria.ariaSwal({
          title: 'Oops',
          text: res.error && res.error.message || 'Something went wrong',
          type: 'error'
        })

        return of(null);
      })
    )
  }

  public isAuthenticatedAsAuthor(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    const isAuthor = JSON.parse(localStorage.getItem('isAuthor'));

    return isAuthor && new Date().getTime() < expiresAt;
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');

    return new Date().getTime() < expiresAt;
  }

  public logout(): void {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('isAuthor');

    this.router.navigate(['/authentication']);
  }
}
