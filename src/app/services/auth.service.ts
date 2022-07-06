import { HttpClient } from '@angular/common/http';
// import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = 'http://bnb.jmacboy.com/api/arrendatario/';

  // constructor(private http: HTTP) {}
//https://ionicframework.com/docs/native/http


  constructor(private http: HttpClient) { }

 postLogin(email: string, password: string): Observable<any>{
  const obj = {
    email,
    password
  };
  // const obj = {
  //   email:'test5@tesdn.com',
  //   password:'12345'
  // };
  const headers = {
    'content-type': 'application/json'
  };
  const body = JSON.stringify(obj);
  return this.http.post(this.baseURL + 'login', body,{headers});
 }

 postRegister(email: string, password: string, name: string, phone: string): Observable<any>{
  const obj = {
    email,
    password,
    nombrecompleto:name,
    telefono:phone
  };
  const headers = {
    'content-type': 'application/json'
  };

  const body = JSON.stringify(obj);
  return this.http.post(this.baseURL + 'registro', body,{headers});

 }


}
