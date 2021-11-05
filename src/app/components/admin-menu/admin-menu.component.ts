import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  user: any = {};
  isMenuProfilActive: boolean = false;
  isMenuUserActive: boolean = false;

  updatePasswordForm: any;

  @ViewChild('content') content: any;
  addModal: any;
  closeResult: string = '';

  currentRoute: string = '/admin/users';
  
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(
       (event: any) => {
         if(event instanceof NavigationEnd)
          this.currentRoute = ''+event.url;
       }
     );
    
    this.auth.me([
      (data: any) => {
        this.user = data;
      },
      (err: HttpErrorResponse) => console.log(err)
    ]);
    this.initForm();
  }

  initForm(){
    this.updatePasswordForm =this.fb.group({
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      newPasswordConfirm: ['', [Validators.required]],
    });
  }

  navigateTo(url: string){
    this.router.navigate(["/admin/" + url]);
  }
  
  openModal(){
    this.open(this.content);
  }

  onSubmit(){
    if(this.updatePasswordForm.inValid)
      return;

    const data = {
      password: this.updatePasswordForm.get('password').value,
      newPassword: this.updatePasswordForm.get('newPassword').value,
      newPasswordConfirm: this.updatePasswordForm.get('newPasswordConfirm').value,
    }

    this.userService.updatePassword(this.user?.id, data, [
      (data: any) => {
        this.content.close('');
        this.showSuccessMessage('Modification de mot de passe', 'Votre mot de passe a été modifié avec succès.');
      },
      (err: HttpErrorResponse) => console.log(err)
    ]);

  }

  logout(){
    const token = sessionStorage.getItem('connectedUser');
    if (token != null){
      sessionStorage.removeItem("connectedUser");
      this.router.navigate(['/'])
    }
  }

  togglePasswordView(id: string) {
    const passInput = document.getElementById(id) as HTMLInputElement;
    (passInput.type === 'password') ? ( passInput.type = 'text') :   passInput.type = 'password';
  }

  // bootstrap modal

  open(content: any) {
    this.addModal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
    this.addModal.result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //end modal

  showSuccessMessage(title: string, text: string){
    Swal.fire({title, text, timer: 3000});
  }
}
