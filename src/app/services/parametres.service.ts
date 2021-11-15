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
    return this.http.put(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/parametres/update`, payload, AppSettings.httpOptions);
  }

  deleteParameter(id: any){
    return this.http.delete(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/parametres/${id}/delete`, AppSettings.httpOptions);
  }

  saveQuestion(payload: any){
    return this.http.post(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/questions/create`, payload, AppSettings.httpOptions);
  }

  getQuestionByParameter(idParameter: any){
    return this.http.get(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/questions/parametre/${idParameter}`, AppSettings.httpOptions);
  }

  updateQuestion(payload: any){
    return this.http.put(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/questions/update`, payload, AppSettings.httpOptions);
  }

  deleteQuestion(id: any){
    return this.http.delete(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/questions/${id}/delete`, AppSettings.httpOptions);
  }

  saveReponse(payload: any){
    return this.http.post(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/reponses/create`, payload, AppSettings.httpOptions);
  }

  getReponseByQuestion(idQuestion: any){
    return this.http.get(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/reponses/question/${idQuestion}`, AppSettings.httpOptions);
  }

  updateReponse(payload: any){
    return this.http.put(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/reponses/update`, payload, AppSettings.httpOptions);
  }

  deleteReponse(id: any){
    return this.http.delete(AppSettings.CIPME_ADMINISTRATION_API_URL + `/api/reponses/${id}/delete`, AppSettings.httpOptions);
  }
}
