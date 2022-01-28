import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import AppSettings from 'src/app/app.settings';
import { AuthService } from 'src/app/services/auth.service';
import { ROLE_ADMIN, ROLE_ADMIN_FONC, ROLE_ENTR, ROLE_EXP_PME } from 'src/app/utils/constante';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string = '';
  errorCode: number = 400;

  signInForm: any;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = sessionStorage.getItem('connectedUser');
    if(user !== null){
      this.auth.me([
          (user: any) => {
            console.log(user);
            
            switch (user?.profil?.code) {
              case ROLE_ADMIN :
                this.router.navigate(['/admin/users']);
                break;
              case ROLE_ADMIN_FONC :
                this.router.navigate(['/ci-pme']);
                break;
              case ROLE_EXP_PME :
                window.location.href = AppSettings.URL_SCORING_HOME+'/liste-pme'
                break;
              default:
                if(user?.confirme == 0){
                  this.showErrorMessage("Connexion", "Veuillez confirmer votre e-mail pour vous connecter.")
                  this.logout();
                }
                if(user?.entrepriseId){
                  window.location.href = AppSettings.URL_SCORING_HOME+'/accueil'
                }
                else{
                  window.location.href = AppSettings.URL_SCORING_HOME+'/identification'
                }
                break;
            }
          },
          (err: HttpErrorResponse) => console.log(err)
        ]);
    }
    this.initForm();
  }

  initForm(){
    this.signInForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(){
    console.log(this.signInForm);

    if(this.signInForm.inValid)
      return;

    const data = {
      username: this.signInForm.get('login').value,
      password: this.signInForm.get('password').value
    }

    this.auth.login(data, [
      (res: any) => {
        const accessToken = res.access_token;
        sessionStorage.setItem('token', JSON.stringify(res));
        this.auth.me([
          (user: any) => {
            sessionStorage.setItem('connectedUser', JSON.stringify({token: accessToken, role: user?.profil?.code}));
            sessionStorage.setItem('connectedUserData', JSON.stringify(user));
            sessionStorage.removeItem('token');
            if(user?.actif == -1){
              this.showErrorMessage("Connexion", "Votre compte a été supprimé.")
              this.logout();
              return;
            }
            switch (user?.profil?.code) {
              case ROLE_ADMIN :
                this.router.navigate(['/admin/users']);
                break;
              case ROLE_ADMIN_FONC :
                this.router.navigate(['/ci-pme']);
                break;
              case ROLE_EXP_PME :
                window.location.href = AppSettings.URL_SCORING_HOME+'/liste-pme'
                break;
              default:
                if(user?.confirme == 0){
                  this.showErrorMessage("Connexion", "Veuillez confirmer votre e-mail pour vous connecter.")
                  this.logout();
                  return;
                }
                if(user?.entrepriseId){
                  window.location.href = AppSettings.URL_SCORING_HOME+'/accueil'
                }
                else{
                  window.location.href = AppSettings.URL_SCORING_HOME+'/identification'
                }
                break;
            }
          },
          (err: HttpErrorResponse) => console.log(err)
        ]);
      },
      (err: HttpErrorResponse) => {
        this.errorCode = err.status;
        if (this.errorCode === 404){
          this.errorMessage = err.error;
        }
        else if(this.errorCode === 403){
          this.errorMessage = "L'utilisateur "+ data.password +" est désactivé."
        }
        else{
          this.errorMessage = 'Identifiant ou mot de passe incorrect';
        }
        console.log(err)
      }
    ]);
  }

  logout(){
    const token = sessionStorage.getItem('connectedUser');
    if (token != null){
      sessionStorage.removeItem("connectedUser");
      sessionStorage.removeItem("connectedUserData");
      this.router.navigate(['/login'])
    }
  }

  //Extra
  togglePasswordView(id: string) {
    const passInput = document.getElementById(id) as HTMLInputElement;
    (passInput.type === 'password') ? ( passInput.type = 'text') :   passInput.type = 'password';

  }

  showErrorMessage(title: string, text: string){
    Swal.fire({title, text, timer: 5000, showConfirmButton: false, icon: 'error'});
  }

}
