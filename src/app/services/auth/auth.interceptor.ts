import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let ACCESS_TOKEN;
    //Set ACCESS_TOKEN to null if we're authenticating or resetting password 
    ( req.url.indexOf('/authenticate') || req.url.indexOf('/reset-password') )  ?  ACCESS_TOKEN = null :  ACCESS_TOKEN = JSON.parse(localStorage.getItem('currentUser')).access_token;
    
    if(ACCESS_TOKEN){
      const CLONED = req.clone( {headers: req.headers.set("Authorization", "Bearer " + ACCESS_TOKEN)} );
      return next.handle(CLONED);
    }else{
      return next.handle(req);
    }
  }

}
