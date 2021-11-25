import {HttpHeaders} from "@angular/common/http";

export class AppSettings {
  // public static CIPME_ADMINISTRATION_API_URL    = 'http://localhost:3000/administration';
  public static CIPME_ADMINISTRATION_API_URL    = 'http://217.182.185.176:3000/administration';

  public static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
}
