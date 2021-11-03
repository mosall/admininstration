import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import AppSettings from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private baseUrl: string = AppSettings.UM_URL;

  constructor(private httpClient: HttpClient) { }

  getUsers(cbs: any ){
    this.httpClient.get(`${this.baseUrl}/users`, AppSettings.httpOptions).subscribe(...cbs);
  }
  getUser(id: number, cbs: any){
    this.httpClient.get(`${this.baseUrl}/users/${id}`, AppSettings.httpOptions).subscribe(...cbs);
  }

  createUser(user: any, cbs: any){
    this.httpClient.post(`${this.baseUrl}/users`, user, AppSettings.httpOptions).subscribe(...cbs)
  }

  editUser(id: number, user: any, cbs: any){
    this.httpClient.put(`${this.baseUrl}/users/${id}`, user, AppSettings.httpOptions).subscribe(...cbs)
  }
  
  updateUser(id: number, user: any, cbs: any){
    this.httpClient.patch(`${this.baseUrl}/users/${id}`, user, AppSettings.httpOptions).subscribe(...cbs)
  }
  

}
