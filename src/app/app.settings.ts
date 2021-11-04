import { HttpHeaders } from "@angular/common/http";

export default class AppSettings {
	 
	public static UM_URL: string = "http://localhost:3000/um/api/auth";
	public static UM_TOKEN_URL: string = "http://localhost:3000/um/oauth/token";

	public static httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
    
}

