import { Injectable } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticateInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthenticationService, private route: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token: string | null = window.localStorage.getItem('authToken')
    if (token) {
      request = this.addTokenHeader(request, token)
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.route.navigate(['/login']);
          return this.handle401Error(request, next);
        }
        else {
          return throwError(error)
        }
      })
    )
  }



  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    // window.localStorage.getItem('authToken') doit etre le result du refresh token
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null)

      return this.authService.refresh({ "token": window.localStorage.getItem('refresh_token') }).pipe(
        switchMap((token: any) => {
          // console.log('the token is', token)
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token['token']);
          return next.handle(this.addTokenHeader(request, token['token']))
        })
      )


    }
    else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          // console.log('access there', jwt)
          return next.handle(this.addTokenHeader(request, jwt))
        })
      )
    }
  }
}
