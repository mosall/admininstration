import { HttpHeaders } from "@angular/common/http";

export default class AppSettings {

  private static BACK_URL = "http://217.182.185.176:3000";
	 
	public static UM_URL: string = AppSettings.BACK_URL+"/um/api/auth";
	public static UM_TOKEN_URL: string = AppSettings.BACK_URL+"/um/oauth/token";

	public static httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
    
}

