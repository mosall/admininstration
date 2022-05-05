import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatiosService {

  constructor(private http: HttpClient) { }

  getRatios(){
    return this.http.get(environment.UM_REFERENTIEL + `/ratios`, environment.httpOptions);
  }

  updatePonderation(payload: any){
    return this.http.put(environment.UM_REFERENTIEL + `/ratios/update`, payload, environment.httpOptions);
  }
}
