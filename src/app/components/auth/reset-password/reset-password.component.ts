import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: any;

  submitted: boolean = false;
  tokenValide: boolean = false;
  token!: string | null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.auth.checkToken({token: this.token}, [
      (data: any) => {this.tokenValide = true;},
      (err: HttpErrorResponse) => {
        console.log(err);
        this.router.navigate(['/account/password_recovery']);
      }     
    ]);
  }

  initForm(){
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get f() { return this.resetPasswordForm.controls;}

  onSubmit(){
    this.submitted = true;
    if(this.resetPasswordForm.invalid){
      return;
    }

    const param = {
      token: this.token,
      newPassword: this.resetPasswordForm.get('password').value,
      newPasswordConfirm: this.resetPasswordForm.get('confirmPassword').value,
    };

    this.auth.resetPassword(param, [
    (data: any) => {
      this.router.navigate(['/'])
    },
    (err: HttpErrorResponse) => console.log(err)
    ]);
  }

  togglePasswordView(id: string) {
      const passInput = document.getElementById(id) as HTMLInputElement;
    (passInput.type === 'password') ? ( passInput.type = 'text') :   passInput.type = 'password';   
    }

}
