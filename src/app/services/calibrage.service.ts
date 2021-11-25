import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import AppSettings from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class CalibrageService {

  constructor(private http: HttpClient) { }

  getCalibrage(idRatio: any){
    return this.http.get(AppSettings.UM_REFERENTIEL + `/calibrages/ratio/${idRatio}`, AppSettings.httpOptions);
  }

  saveCalibrage(payload: any){
    return this.http.post(AppSettings.UM_REFERENTIEL + `/calibrages/create`, payload, AppSettings.httpOptions);
  }

  updateCalibrage(payload: any){
    return this.http.put(AppSettings.UM_REFERENTIEL + `/calibrages/update`, payload, AppSettings.httpOptions);
  }

  deleteCalibrage(id: any){
    return this.http.delete(AppSettings.UM_REFERENTIEL + `/calibrages/${id}/delete`, AppSettings.httpOptions);
  }

}
