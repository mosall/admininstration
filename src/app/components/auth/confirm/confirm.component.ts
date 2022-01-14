import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  rsConfirm: string = '';
  token: string | null;
  email: string = '';

  constructor(
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token');
  }
  
  ngOnInit(): void {
    Swal.fire({
      title: 'Veuillez patienter ...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.confirm(this.token);
  }

  confirm(token: any){
    const cbs = [
      (data: any) => {
        if(data == 1){
          this.rsConfirm = 'confirmed'
        }
        else if(data == 2){
          this.rsConfirm = 'success';
        }
        Swal.close();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.rsConfirm = 'error';
        Swal.close();
      }
    ];

    this.auth.confirm(token, cbs);
  }

  sendActivationMail(){
    const payload = {
      email: this.email,
      token: this.token
    };
    this.auth.sendActivationMail(payload).subscribe(
      data => {
        this.showSuccessMessage('Activation de compte', 'Un mail d\'activation a été envoyé à votre address mail.');
        this.router.navigate(['/login']);
      },
      err => {
        this.showErrorMessage('Activation de compte', 'Un mail d\'activation n\'a pas été envoyé à votre address mail.');
        console.log(err);
      }        
    )
    
  }

  setActivation(){
    this.rsConfirm = 'resend';
  }

  showSuccessMessage(title: string, text: string){
    Swal.fire({title, text, timer: 5000, showConfirmButton: false, icon: 'success'}).then(()=> {});
  }
  showErrorMessage(title: string, text: string){
    Swal.fire({title, text, timer: 5000, showConfirmButton: false, icon: 'error'});
  }

}
// eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzcxODIyMTIsImV4cCI6MTYzNzE4NDAxMn0.5KP4SyQZi-SE0TBYRYnCmJiKNn8cJrbY1ySs7uumA9o
