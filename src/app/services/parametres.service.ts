import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../settings/app.settings";

@Injectable({
  providedIn: 'root'
})
export class ParametresService {

  constructor(private http: HttpClient) { }

  saveParameter(payload: any){
    return this.http.post(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/parametres/create`, payload, AppSettings.httpOptions);
  }

  getParameter(){
    return this.http.get(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/parametres`, AppSettings.httpOptions);
  }

  updateParameter(payload: any){
    return this.http.put(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/parametres/update`, payload);
  }

  deleteParameter(id: any){
    return this.http.delete(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/parametres/${id}/delete`);
  }

  saveQuestion(payload: any){
    return this.http.post(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/questions/create`, payload);
  }

  getQuestionByParameter(idParameter: any){
    return this.http.get(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/questions/parametre/${idParameter}`);
  }

  updateQuestion(payload: any){
    return this.http.put(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/questions/update`, payload);
  }

  deleteQuestion(id: any){
    return this.http.delete(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/questions/${id}/delete`);
  }

  saveReponse(payload: any){
    return this.http.post(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/reponses/create`, payload);
  }

  getReponseByQuestion(idQuestion: any){
    return this.http.get(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/reponses/question/${idQuestion}`);
  }

  updateReponse(payload: any){
    return this.http.put(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/reponses/update`, payload);
  }

  deleteReponse(id: any){
    return this.http.delete(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/reponses/${id}/delete`);
  }
}
