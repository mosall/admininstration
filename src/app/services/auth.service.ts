import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface Body{
  [key: string]: any
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl =  environment.UM_TOKEN_URL;
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

    this.http.post(environment.UM_TOKEN_URL, params.toString(), httpOptions).subscribe(...cbs);
  }

  forgotPassword(emailOrId: any, cbs: any){
    this.http.post(environment.UM_URL + '/forgot_password', emailOrId).subscribe(...cbs);
  }


  checkToken(data: any, cbs: any){
    this.http.post(`${environment.UM_URL}/check_token`, data, environment.httpOptions).subscribe(...cbs);
  }

  resetPassword(data: any, cbs: any){
    this.http.post(environment.UM_URL + '/reset_password', data).subscribe(...cbs);
  }

  me(cbs: any){
    this.http.get(`${environment.UM_URL}/me`, environment.httpOptions).subscribe(...cbs);
  }

  logout(){
    const token = sessionStorage.getItem('connectedUser');
    if (token != null){
      sessionStorage.removeItem("connectedUser");
    }
  }

  register(data: any, cbs: any){
    this.http.post(`${environment.UM_URL}/register`, data, environment.httpOptions).subscribe(...cbs);
  }

  confirm(token: string, cbs: any){
    this.http.get(`${environment.UM_URL}/users/confirm?token=${token}`, environment.httpOptions).subscribe(...cbs);
  }
  
  sendActivationMail(payload: any ) {    
    return this.http.post(`${environment.UM_URL}/users/confirmation_mail`, payload, environment.httpOptions);
  }

}
