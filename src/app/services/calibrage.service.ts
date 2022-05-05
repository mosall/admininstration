import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalibrageService {

  constructor(private http: HttpClient) { }

  getCalibrage(idRatio: any){
    return this.http.get(environment.UM_REFERENTIEL + `/calibrages/ratio/${idRatio}`, environment.httpOptions);
  }

  saveCalibrage(payload: any){
    return this.http.post(environment.UM_REFERENTIEL + `/calibrages/create`, payload, environment.httpOptions);
  }

  updateCalibrage(payload: any){
    return this.http.put(environment.UM_REFERENTIEL + `/calibrages/update`, payload, environment.httpOptions);
  }

  deleteCalibrage(id: any){
    return this.http.delete(environment.UM_REFERENTIEL + `/calibrages/${id}/delete`, environment.httpOptions);
  }

}
