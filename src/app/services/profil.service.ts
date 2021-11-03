import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AppSettings from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private baseUrl: string = AppSettings.UM_URL;

  constructor(
    private httpClient: HttpClient
  ) { }

  getProfils(cbs: any){
    this.httpClient.get(`${this.baseUrl}/profils`, AppSettings.httpOptions).subscribe(...cbs);
  }
  
  getProfil(id: number, cbs: any){
    this.httpClient.get(`${this.baseUrl}/profils/${id}`, AppSettings.httpOptions).subscribe(...cbs);
  }
  
  createUser(data: any, cbs: any){
    this.httpClient.post(`${this.baseUrl}/profils`, data, AppSettings.httpOptions).subscribe(...cbs);
  }
  editUser(id: number, data: any, cbs: any){
    this.httpClient.put(`${this.baseUrl}/profils/${id}`, data, AppSettings.httpOptions).subscribe(...cbs);
  }
  updateUser(id: number, data: any, cbs: any){
    this.httpClient.patch(`${this.baseUrl}/profils/${id}`, data, AppSettings.httpOptions).subscribe(...cbs);
  }

  switchStatus(id: number, cbs: any){
    this.httpClient.get(`${this.baseUrl}/profils/${id}/status`, AppSettings.httpOptions).subscribe(...cbs);
  }
}
