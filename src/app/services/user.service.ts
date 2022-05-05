import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private baseUrl: string = environment.UM_URL;

  constructor(private httpClient: HttpClient) { }

  getUsers(cbs: any ){
    this.httpClient.get(`${this.baseUrl}/users`, environment.httpOptions).subscribe(...cbs);
  }
  getUser(id: number, cbs: any){
    this.httpClient.get(`${this.baseUrl}/users/${id}`, environment.httpOptions).subscribe(...cbs);
  }

  createUser(user: any, cbs: any){
    this.httpClient.post(`${this.baseUrl}/users`, user, environment.httpOptions).subscribe(...cbs)
  }

  editUser(id: number, user: any, cbs: any){
    this.httpClient.put(`${this.baseUrl}/users/${id}`, user, environment.httpOptions).subscribe(...cbs)
  }
  
  updateUser(id: number, user: any, cbs: any){
    this.httpClient.patch(`${this.baseUrl}/users/${id}`, user, environment.httpOptions).subscribe(...cbs)
  }
  
  switchSatus(id: number, cbs: any){
    this.httpClient.get(`${this.baseUrl}/users/${id}/status`, environment.httpOptions).subscribe(...cbs)
  }
  
  deleteUser(id: number, cbs: any){
    this.httpClient.delete(`${this.baseUrl}/users/${id}`, environment.httpOptions).subscribe(...cbs)
  }
  
  updatePassword(id: number, data: any, cbs: any){
    this.httpClient.patch(`${this.baseUrl}/users/${id}/update-password`, data, environment.httpOptions).subscribe(...cbs);
  }
}
