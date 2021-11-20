import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import AppSettings from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class ParametresService {

  constructor(private http: HttpClient) { }

  saveParameter(payload: any){
    return this.http.post(AppSettings.UM_REFERENTIEL + `/parametres/create`, payload, AppSettings.httpOptions);
  }

  getParameter(){
    return this.http.get(AppSettings.UM_REFERENTIEL + `/parametres`, AppSettings.httpOptions);
  }

  updateParameter(payload: any){
    return this.http.put(AppSettings.UM_REFERENTIEL + `/parametres/update`, payload, AppSettings.httpOptions);
  }

  deleteParameter(id: any){
    return this.http.delete(AppSettings.UM_REFERENTIEL + `/parametres/${id}/delete`, AppSettings.httpOptions);
  }

  saveQuestion(payload: any){
    return this.http.post(AppSettings.UM_REFERENTIEL + `/questions/create`, payload, AppSettings.httpOptions);
  }

  getQuestionByParameter(idParameter: any){
    return this.http.get(AppSettings.UM_REFERENTIEL + `/questions/parametre/${idParameter}`, AppSettings.httpOptions);
  }

  updateQuestion(payload: any){
    return this.http.put(AppSettings.UM_REFERENTIEL + `/questions/update`, payload, AppSettings.httpOptions);
  }

  deleteQuestion(id: any){
    return this.http.delete(AppSettings.UM_REFERENTIEL + `/questions/${id}/delete`, AppSettings.httpOptions);
  }

  saveReponse(payload: any){
    return this.http.post(AppSettings.UM_REFERENTIEL + `/reponses/create`, payload, AppSettings.httpOptions);
  }

  getReponseByQuestion(idQuestion: any){
    return this.http.get(AppSettings.UM_REFERENTIEL + `/reponses/question/${idQuestion}`, AppSettings.httpOptions);
  }

  updateReponse(payload: any){
    return this.http.put(AppSettings.UM_REFERENTIEL + `/reponses/update`, payload, AppSettings.httpOptions);
  }

  deleteReponse(id: any){
    return this.http.delete(AppSettings.UM_REFERENTIEL + `/reponses/${id}/delete`, AppSettings.httpOptions);
  }
}
