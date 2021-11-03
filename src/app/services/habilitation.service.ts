import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AppSettings from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class HabilitationService {

  private baseUrl = AppSettings.UM_URL;

  constructor(
    private http: HttpClient
  ) { }

  getHabilitations(cbs: any){
    this.http.get(`${this.baseUrl}/habilitations`, AppSettings.httpOptions).subscribe(...cbs);
  }
}
