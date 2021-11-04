import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgetPasswordForm: any;

  errorMessage: string = '';
  errorCode: number = 400;


  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required]]
    });
  }

  onSubmit(){
    if(this.forgetPasswordForm.inValid)
      return;
    
    const data = {
      emailOrUsername: this.forgetPasswordForm.get('email').value
    }

    this.auth.forgotPassword(data, [
      (data: any) => {},
      (err: HttpErrorResponse) => console.log(err)
    ]);
  }

}
