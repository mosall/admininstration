import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: any;
  submitted: boolean = false;

  errorMsg: string = '';
  statusCode: number = 200;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm(null);
  }

  initForm(data: any){
    this.registrationForm = this.fb.group({
      prenom: [data?.prenom, [Validators.required]],
      nom: [data?.nom, [Validators.required]],
      username: [data?.username, [Validators.required]],
      email: [data?.email, [Validators.required]],
      password: [data?.password, [Validators.required]],
      confirmationPassword: [data?.confirmationPassword, [Validators.required]],
      mobile: [data?.mobile, [Validators.required]],
      fonction: [data?.fonction, [Validators.required]],
      entrepriseLibelle: [data?.entrepriseLibelle, [Validators.required]],
    });
  }

  get f() {return this.registrationForm.controls;}


  onSubmit(){
    this.submitted = true;
    console.log(this.registrationForm);
    
    if(this.registrationForm.invalid)
      return;
    
    const data: any = {
      // id: this.addUserForm.get('id')?.value,
      username: this.registrationForm.get('username')?.value,
      email: this.registrationForm.get('email')?.value,
      prenom: this.registrationForm.get('prenom')?.value,
      nom: this.registrationForm.get('nom')?.value,
      profil: 2,
      password: this.registrationForm.get('password')?.value,
      confirmationPassword: this.registrationForm.get('confirmationPassword')?.value,
      mobile: this.registrationForm.get('mobile').value,
      fonction: this.registrationForm.get('fonction').value,
      entrepriseLibelle: this.registrationForm.get('entrepriseLibelle').value,
    };
   
    const cbs: any = [
      (data: any) =>{
        this.showSuccessMessage('Nouveau compte', 'Un mail de confirmation a été envoyé à votre adresse mail.');
        this.router.navigate(['/']);

      },
      (err: HttpErrorResponse) =>{
        console.log(err);
        this.statusCode = err.status;
        this.errorMsg = err.error;
      },
    ];

    this.auth.register(data, cbs);
  }

  showSuccessMessage(title: string, text: string){
    Swal.fire({title, text, timer: 3000});
  }

}
