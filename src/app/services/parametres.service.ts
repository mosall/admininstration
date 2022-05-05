import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParametresService {

  constructor(private http: HttpClient) { }

  saveParameter(payload: any){
    return this.http.post(environment.UM_REFERENTIEL + `/parametres/create`, payload, environment.httpOptions);
  }

  getParameter(){
    return this.http.get(environment.UM_REFERENTIEL + `/parametres`, environment.httpOptions);
  }

  updateParameter(payload: any){
    return this.http.put(environment.UM_REFERENTIEL + `/parametres/update`, payload, environment.httpOptions);
  }

  deleteParameter(id: any){
    return this.http.delete(environment.UM_REFERENTIEL + `/parametres/${id}/delete`, environment.httpOptions);
  }

  saveQuestion(payload: any){
    return this.http.post(environment.UM_REFERENTIEL + `/questions/create`, payload, environment.httpOptions);
  }

  getQuestionByParameter(idParameter: any){
    return this.http.get(environment.UM_REFERENTIEL + `/questions/parametre/${idParameter}`, environment.httpOptions);
  }

  updateQuestion(payload: any){
    return this.http.put(environment.UM_REFERENTIEL + `/questions/update`, payload, environment.httpOptions);
  }

  deleteQuestion(id: any){
    return this.http.delete(environment.UM_REFERENTIEL + `/questions/${id}/delete`, environment.httpOptions);
  }

  saveReponse(payload: any){
    return this.http.post(environment.UM_REFERENTIEL + `/reponses/create`, payload, environment.httpOptions);
  }

  getReponseByQuestion(idQuestion: any){
    return this.http.get(environment.UM_REFERENTIEL + `/reponses/question/${idQuestion}`, environment.httpOptions);
  }

  updateReponse(payload: any){
    return this.http.put(environment.UM_REFERENTIEL + `/reponses/update`, payload, environment.httpOptions);
  }

  deleteReponse(id: any){
    return this.http.delete(environment.UM_REFERENTIEL + `/reponses/${id}/delete`, environment.httpOptions);
  }
}
