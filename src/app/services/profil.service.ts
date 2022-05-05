import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private baseUrl: string = environment.UM_URL;

  constructor(
    private httpClient: HttpClient
  ) { }

  getProfils(cbs: any){
    this.httpClient.get(`${this.baseUrl}/profils`, environment.httpOptions).subscribe(...cbs);
  }
  
  getProfil(id: number, cbs: any){
    this.httpClient.get(`${this.baseUrl}/profils/${id}`, environment.httpOptions).subscribe(...cbs);
  }
  
  createUser(data: any, cbs: any){
    this.httpClient.post(`${this.baseUrl}/profils`, data, environment.httpOptions).subscribe(...cbs);
  }
  editUser(id: number, data: any, cbs: any){
    this.httpClient.put(`${this.baseUrl}/profils/${id}`, data, environment.httpOptions).subscribe(...cbs);
  }
  updateUser(id: number, data: any, cbs: any){
    this.httpClient.patch(`${this.baseUrl}/profils/${id}`, data, environment.httpOptions).subscribe(...cbs);
  }

  switchStatus(id: number, cbs: any){
    this.httpClient.get(`${this.baseUrl}/profils/${id}/status`, environment.httpOptions).subscribe(...cbs);
  }
}
