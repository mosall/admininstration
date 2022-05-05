import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EligibilityService {

  constructor(private http: HttpClient) { }

  saveQuestion(payload: any){
    return this.http.post(environment.UM_REFERENTIEL + `/questions/create`, payload, environment.httpOptions);
  }

  getQuestion(){
    return this.http.get(environment.UM_REFERENTIEL + `/questions/eligibilite`, environment.httpOptions);
  }

  updateQuestion(payload: any){
    return this.http.put(environment.UM_REFERENTIEL + `/questions/update`, payload, environment.httpOptions);
  }

  deleteQuestion(id: any){
    return this.http.delete(environment.UM_REFERENTIEL + `/questions/${id}/delete`, environment.httpOptions);
  }
}
