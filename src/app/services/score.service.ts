import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import AppSettings from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient) { }

  savePonderation(payload: any){
    return this.http.post(AppSettings.UM_REFERENTIEL + `/ponderations/create`, payload, AppSettings.httpOptions);
  }

  getPonderation(){
    return this.http.get(AppSettings.UM_REFERENTIEL + `/ponderations`, AppSettings.httpOptions);
  }

  updatePonderation(payload: any){
    return this.http.put(AppSettings.UM_REFERENTIEL + `/ponderations/update`, payload, AppSettings.httpOptions);
  }

  deletePonderation(id: any){
    return this.http.delete(AppSettings.UM_REFERENTIEL + `/ponderations/${id}/delete`, AppSettings.httpOptions);
  }
}
