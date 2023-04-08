import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { PublicService } from '../services/public.service';

@Injectable()
export class LoadingInterceptorInterceptor implements HttpInterceptor {

  constructor(public publicService: PublicService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.publicService.isLoading.next(true)
    return next.handle(request).pipe(
      finalize(
        () => {
          this.publicService.isLoading.next(false);
        }
      )
    );
  }
}
