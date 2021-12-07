import { Injectable } from '@angular/core';
import {AppSettings} from "../settings/app.settings";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient) { }

  savePonderation(payload: any){
    return this.http.post(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/ponderations/create`, payload, AppSettings.httpOptions);
  }

  getPonderation(){
    return this.http.get(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/ponderations`, AppSettings.httpOptions);
  }

  updatePonderation(payload: any){
    return this.http.put(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/ponderations/update`, payload, AppSettings.httpOptions);
  }

  deletePonderation(id: any){
    return this.http.delete(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/ponderations/${id}/delete`, AppSettings.httpOptions);
  }
}
