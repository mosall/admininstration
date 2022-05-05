import { HttpHeaders } from "@angular/common/http";

const BACK_URL: string = "http://217.182.185.176";

export const environment = {
  production: true,
	 
	UM_URL: BACK_URL+":9000/administration/api/auth",
	UM_REFERENTIEL: BACK_URL+":9000/administration/api",
	UM_TOKEN_URL: BACK_URL+":9000/administration/oauth/token",
  
	URL_SCORING_HOME: BACK_URL+"/scoring/ci-pme",

	httpOptions : {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    },
};
