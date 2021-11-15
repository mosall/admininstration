import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../settings/app.settings";

@Injectable({
  providedIn: 'root'
})
export class CalibrageService {

  constructor(private http: HttpClient) { }

  getCalibrage(idRatio: any){
    return this.http.get(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/calibrages/ratio/${idRatio}`, AppSettings.httpOptions);
  }

  saveCalibrage(payload: any){
    return this.http.post(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/calibrages/create`, payload, AppSettings.httpOptions);
  }

  updateCalibrage(payload: any){
    return this.http.put(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/calibrages/update`, payload, AppSettings.httpOptions);
  }

  deleteCalibrage(id: any){
    return this.http.delete(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/calibrages/${id}/delete`, AppSettings.httpOptions);
  }

}
