import { Injectable } from '@angular/core';
import {AppSettings} from "../settings/app.settings";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EligibilityService {

  constructor(private http: HttpClient) { }

  saveQuestion(payload: any){
    return this.http.post(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/questions/create`, payload, AppSettings.httpOptions);
  }

  getQuestion(){
    return this.http.get(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/questions/eligibilite`, AppSettings.httpOptions);
  }

  updateQuestion(payload: any){
    return this.http.put(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/questions/update`, payload, AppSettings.httpOptions);
  }

  deleteQuestion(id: any){
    return this.http.delete(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/questions/${id}/delete`, AppSettings.httpOptions);
  }
}
