import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { TokenService } from '../token/service/token.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginInterceptor implements HttpInterceptor{
  constructor(public tokenService: TokenService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getLocalStorageToken();
    //console.log(token);
    if ( token ) {
      const cloneReq = req.clone(
        {
          headers: req.headers.set('Authorization', `Bearer ${token.token}`)
        }
      );
      return next.handle(cloneReq).pipe(
      catchError(
        (err) => {
          if (err.status === 401 || err.status === 403){
            this.tokenService.removeLocalStorage();
            this.router.navigate(['/login']);
          }
          throw err;
        }
      )
    );
    }else {
      return next.handle(req);
    }
  }
}

export const LoginInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: LoginInterceptor,
  multi: true
}
