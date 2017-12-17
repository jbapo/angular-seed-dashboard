import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppSettings } from "../../app.settings";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService implements CanActivate {
  private isAuthenticated = true;
  
  constructor(
    private router: Router,
    private _http: HttpClient
  ) {
    if(this.isAuthenticated)localStorage.setItem('currentUser', JSON.stringify({access_token: 'accesstokenstring'}));
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      //Check if token expired
      if( this.tokenNotExpired( JSON.parse(localStorage.getItem('currentUser')).access_token ) ){ return true; }
      return false;
    }
    this.router.navigate(['/sessions/signin']);
    return false;
  }

  signin(signinData): Observable<any> {
    return this._http.post( AppSettings.API_HOST + "/authenticate", JSON.stringify(signinData) );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  tokenNotExpired(access_token){
    return true;
  }

}