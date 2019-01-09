import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken:any;

  constructor( private http:HttpClient) { }

login(model:any){
  return this.http.post(this.baseUrl + 'login', model)
    .pipe(
      map((response:any) => {
        const user = response;
        //console.log(user);
        if(user) {
          localStorage.setItem('token', user.token); 
          // key token, value user.token, because JSON object was returned {"token": ...asdf98as79f72w.283y742983ew} and was assigned to user, so user.token
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
        }
      })
    )
}

register(model:any){
  return this.http.post(this.baseUrl + 'register', model);
}

loggedIn(){
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

}
