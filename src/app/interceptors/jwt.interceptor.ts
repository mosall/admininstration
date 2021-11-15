import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.endsWith("login") && req.url.endsWith("forgot_password") && req.url.endsWith("reset_password") && req.url.endsWith("/oauth/token")){
      return next.handle(req);
    }
    let token = "";
    const jwt = sessionStorage.getItem('token');
    if(jwt != null){
      const oaut_jwt = JSON.parse(jwt);
      token = oaut_jwt.access_token;      
    }
    const key = sessionStorage.getItem("connectedUser");
    if(key != null){
      const s = JSON.parse(key); 
      token = s.token;
    }
    if(token != ""){
      req = req.clone({
        setHeaders: {
          'Content-Type' : 'application/json; charset=utf-8',
          'Accept'       : 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    }

    return next.handle(req);
  }
}
