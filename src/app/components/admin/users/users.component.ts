import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfilService } from 'src/app/services/profil.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild('content') content: any;

  closeResult = '';
  addModal: any;

  users: any = [];
  profils: any = [];

  errorMessage: string = '';
  addUserForm: FormGroup = this.fb.group({
      id: [''],
      username: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")]],
      profil: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmePassword: ['', [Validators.required]],
  });
  submitted: boolean = false;
  edit: boolean = false;

  constructor(
    private userService: UserService,
    private profilService: ProfilService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userService.getUsers([
      (users: any) => {
        return this.users = users;
      },
      (err: HttpErrorResponse) => {
        console.log(err);  
      }
    ]);

    this.profilService.getProfils([
      (data: any) => {this.profils = data;},
      (err: HttpErrorResponse) => {},
    ]);
  }
  //User

  fillForm(user: any){
    this.addUserForm = this.fb.group({
      id: [user.id, [Validators.required]],
      username: [user.identifiant, [Validators.required]],
      prenom: [user.prenom, [Validators.required]],
      nom: [user.nom, [Validators.required]],
      email: [user.email, [Validators.required, Validators.pattern("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")]],
      profil: [user.profil, [Validators.required]],
    })
  }

  get f() { return this.addUserForm.controls;}

  addUser(): void{}

  editUser(id: number){
    this.userService.getUser(id, [
      (data: any) =>{
        this.fillForm(data);
        this.open(this.content)
      },
      (err: HttpErrorResponse) =>{},
    ]);
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.addUserForm);
    
    if(!this.addUserForm.valid)
      return;
      interface Body{
        [key: string]: any
      }
      const data: Body = {
        id: this.addUserForm.get('id')?.value,
        identifiant: this.addUserForm.get('username')?.value,
        email: this.addUserForm.get('email')?.value,
        prenom: this.addUserForm.get('prenom')?.value,
        nom: this.addUserForm.get('nom')?.value,
        profil: this.addUserForm.get('profil')?.value,
      };
      
      if(!this.edit){
        data.motDePasse = this.addUserForm.get('motDePasse')?.value;
        data.motDePasseConfirme = this.addUserForm.get('motDePasseConfirme')?.value;

      }
      // if(this.addUserForm.get('id')?.value !== 0)
      //   data.id = this.addUserForm.get('id')?.value;
      console.log(data);
      const cbs: any[] = [
        (data: any) => {

        },
        (err: HttpErrorResponse) =>{

        }
      ];
      if(data.id == 0) this.userService.createUser(data, cbs);
      else this.userService.editUser(data.id, data, cbs);
      
  }

  togglePasswordView(field: string){}

  //Pagination

  onChangePage(param: any){}

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
}
