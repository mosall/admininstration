import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import AppSettings from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class EligibilityService {

  constructor(private http: HttpClient) { }

  saveQuestion(payload: any){
    return this.http.post(AppSettings.UM_REFERENTIEL + `/questions/create`, payload, AppSettings.httpOptions);
  }

  getQuestion(){
    return this.http.get(AppSettings.UM_REFERENTIEL + `/questions/eligibilite`, AppSettings.httpOptions);
  }

  updateQuestion(payload: any){
    return this.http.put(AppSettings.UM_REFERENTIEL + `/questions/update`, payload, AppSettings.httpOptions);
  }

  deleteQuestion(id: any){
    return this.http.delete(AppSettings.UM_REFERENTIEL + `/questions/${id}/delete`, AppSettings.httpOptions);
  }
}
