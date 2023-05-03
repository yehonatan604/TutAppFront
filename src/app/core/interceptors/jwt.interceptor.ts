import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = localStorage.getItem('TOKEN');
        const clonedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${authToken}`,
              }
           });
        return next.handle(clonedRequest);
    }
}