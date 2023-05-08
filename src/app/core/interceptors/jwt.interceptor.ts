import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let token = localStorage.getItem('TOKEN');
    if (token) {
      let clonedReq = this.addToken(request, token);
      return next.handle(clonedReq).pipe(
        map((event: HttpEvent<any>) => {
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error));
        })
      );
    } else {
      return next.handle(request);
    }
  }

  private addToken(request: HttpRequest<any>, token: any) {
    if (token) {
      let clone: HttpRequest<any>;
      clone = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return clone;
    }
    return request;
  }
}
