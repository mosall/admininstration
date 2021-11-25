import { HttpHeaders } from "@angular/common/http";

export default class AppSettings {

  private static BACK_URL = "http://217.182.185.176:3000";
  // private static BACK_URL = "http://localhost:3000";

	public static UM_URL: string = AppSettings.BACK_URL+"/administration/api/auth";
	public static UM_REFERENTIEL: string = AppSettings.BACK_URL+"/administration/api";
	public static UM_TOKEN_URL: string = AppSettings.BACK_URL+"/administration/oauth/token";

	public static httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

}

