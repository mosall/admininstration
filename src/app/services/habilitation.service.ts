import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HabilitationService {

  private baseUrl = environment.UM_URL;

  constructor(
    private http: HttpClient
  ) { }

  getHabilitations(cbs: any){
    this.http.get(`${this.baseUrl}/habilitations`, environment.httpOptions).subscribe(...cbs);
  }
}
