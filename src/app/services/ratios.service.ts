import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../settings/app.settings";

@Injectable({
  providedIn: 'root'
})
export class RatiosService {

  constructor(private http: HttpClient) { }

  getRatios(){
    return this.http.get(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/ratios`, AppSettings.httpOptions);
  }

  updatePonderation(payload: any){
    return this.http.put(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/ratios/update`, payload, AppSettings.httpOptions);
  }
}
