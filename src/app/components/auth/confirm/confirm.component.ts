import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  rsConfirm: string = '';

  constructor(
    private auth: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let token = this.activatedRoute.snapshot.queryParamMap.get('token');
    Swal.fire({
      title: 'Veuillez patienter ...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.confirm(token);
  }

  confirm(token: any){
    const cbs = [
      (data: any) => {
        this.rsConfirm = 'success';
        Swal.close();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.rsConfirm = 'danger';
      }
    ];

    this.auth.confirm(token, cbs);
  }

}
// eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzcxODIyMTIsImV4cCI6MTYzNzE4NDAxMn0.5KP4SyQZi-SE0TBYRYnCmJiKNn8cJrbY1ySs7uumA9o
