import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AppSettings from '../app.settings';

interface Body{
  [key: string]: any
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl =  AppSettings.UM_TOKEN_URL;
  private clientId: string = 'cipme';
  private clientSecret: string = 'cipme';

  constructor(
    private http: HttpClient
  ) { }

  login(data: any, cbs: any){
    const {username, password} = data;

    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);    
    params.append('grant_type','password');

    // 'content-type': 'multipart/form-data',
    let headers = 
      new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic '+btoa(`${this.clientId}:${this.clientSecret}`)
    });
    
    const httpOptions = {
      headers
    };

    this.http.post(AppSettings.UM_TOKEN_URL, params.toString(), httpOptions).subscribe(...cbs);
  }

  forgotPassword(emailOrId: any, cbs: any){
    this.http.post(AppSettings.UM_URL + '/forgot_password', emailOrId).subscribe(...cbs);
  }


  checkToken(data: any, cbs: any){
    this.http.post(`${AppSettings.UM_URL}/check_token`, data, AppSettings.httpOptions).subscribe(...cbs);
  }

  resetPassword(data: any, cbs: any){
    this.http.post(AppSettings.UM_URL + '/reset_password', data).subscribe(...cbs);
  }

  me(cbs: any){
    this.http.get(`${AppSettings.UM_URL}/me`, AppSettings.httpOptions).subscribe(...cbs);
  }

  logout(){
    const token = sessionStorage.getItem('connectedUser');
    if (token != null){
      sessionStorage.removeItem("connectedUser");
    }
  }
}
