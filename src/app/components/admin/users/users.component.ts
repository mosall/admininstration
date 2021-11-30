import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfilService } from 'src/app/services/profil.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild('content') content: any;
  @ViewChild('details') details: any;

  closeResult = '';
  addModal: any;

  users: any[] = [];
  profils: any = [];
  user: any;

  errorMessage: string = '';
  addUserForm: any;


  submitted: boolean = false;
  edit: boolean = false;

  page = 1;
  pageSize = 5;

  constructor(
    private userService: UserService,
    private profilService: ProfilService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fetchProfils();
    this.fetchUsers();
    this.initForm(null);
  }

  fetchProfils(){
    this.profilService.getProfils([
      (data: any) => {this.profils = data;},
      (err: HttpErrorResponse) => {console.log(err);},
    ]);
  }

  fetchUsers(){
    this.userService.getUsers([
      (data: any) => {this.users = data;},
      (err: HttpErrorResponse) => {console.log(err);},
    ]);
  }

  //User

  initForm(user: any){
    this.addUserForm = this.fb.group({
      id: [user?.id],
      username: [user?.username, [Validators.required]],
      prenom: [user?.prenom, [Validators.required]],
      nom: [user?.nom, [Validators.required]],
      email: [user?.email, [Validators.required, Validators.pattern("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")]],
      profil: [user?.profil?.id, [Validators.required]],
      password: ['' ],
      confirmePassword: ['' ],
    });
    if(!this.edit){
      this.addUserForm.get('password').addValidators(Validators.required);
      this.addUserForm.get('confirmePassword').addValidators(Validators.required);
    }
  }

  get f() { return this.addUserForm.controls;}

  addUser(): void{
    this.edit = false;
    this.open(this.content);
  }

  editUser(id: number){
    this.edit = true;
    this.userService.getUser(id, [
      (data: any) =>{
        this.initForm(data);
        this.open(this.content)
      },
      (err: HttpErrorResponse) =>{},
    ]);
  }

  statusChanged(id: number){
    this.userService.switchSatus(id, [
      (data: any) => {
        this.showSuccessMessage('', 'L\'action est effectué avec succès.')
      },
      (err: HttpErrorResponse) => {console.log(err)},
    ]);
  }

  showDetails(id: number){
    this.userService.getUser(id, [
      (data: any) => {
        this.user = data;
        this.open(this.details)
      },
      (err: HttpErrorResponse) => {console.log(err)}
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
      username: this.addUserForm.get('username')?.value,
      email: this.addUserForm.get('email')?.value,
      prenom: this.addUserForm.get('prenom')?.value,
      nom: this.addUserForm.get('nom')?.value,
      profil: this.addUserForm.get('profil')?.value,
    };
    
    if(!data.id){
      data.password = this.addUserForm.get('password')?.value;
      data.confirmationPassword = this.addUserForm.get('confirmePassword')?.value;
    }
    // if(this.addUserForm.get('id')?.value !== 0)
    //   data.id = this.addUserForm.get('id')?.value;
    console.log(data);
    const cbs: any[] = [
      (data: any) => {
        this.fetchUsers();
      },
      (err: HttpErrorResponse) =>{
        console.log(err);
        this.fetchUsers();
      }
    ];
    if(!data.id){
      this.userService.createUser(data, cbs);
      this.showSuccessMessage('', 'L\'utilisateur a été ajouté avec succès.');
    }
    else{
      this.userService.editUser(data.id, data, cbs);
      this.showSuccessMessage('', 'L\'utilisateur a été modifié avec succès.');
    }
    this.addModal.close('');
  }

  togglePasswordView(field: string){
    const passInput = document.getElementById(field) as HTMLInputElement;
    (passInput.type === 'password') ? ( passInput.type = 'text') :   passInput.type = 'password';
  }

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

  showSuccessMessage(title: string, text: string){
    Swal.fire({title, text, timer: 5000, showConfirmButton: false, icon: 'success'});
  }

  // Pagination
  
  getPageSymbol(current: number) {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][current - 1];
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }
}
