import { HttpHeaders } from "@angular/common/http";

export default class AppSettings {

  private static BACK_URL = "http://217.182.185.176";
	 
	public static UM_URL: string = AppSettings.BACK_URL+":3000/administration/api/auth";
	public static UM_REFERENTIEL: string = AppSettings.BACK_URL+":3000/administration/api";
	public static UM_TOKEN_URL: string = AppSettings.BACK_URL+":3000/administration/oauth/token";
  
	public static URL_SCORING_HOME: string = AppSettings.BACK_URL+"/scoring-awi/ci-pme";

	public static httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

}

