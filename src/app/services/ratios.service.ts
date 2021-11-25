import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import AppSettings from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class RatiosService {

  constructor(private http: HttpClient) { }

  getRatios(){
    return this.http.get(AppSettings.UM_REFERENTIEL + `/ratios`, AppSettings.httpOptions);
  }

  updatePonderation(payload: any){
    return this.http.put(AppSettings.UM_REFERENTIEL + `/ratios/update`, payload, AppSettings.httpOptions);
  }
}
