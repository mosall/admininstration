import { HttpErrorResponse } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { HabilitationService } from 'src/app/services/habilitation.service';
import { ProfilService } from 'src/app/services/profil.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profils',
  templateUrl: './profils.component.html',
  styleUrls: ['./profils.component.scss']
})
export class ProfilsComponent implements OnInit {

  profils: any;
  habilitations: any;
  profil: any;

  addModal: any;
  closeResult: string = '';
  @ViewChild('content') content: any;
  @ViewChild('detail') detail: any;

  errorMessage: string = '';

  addProfilForm: FormGroup = new FormGroup({});
  submitted: boolean = false;

  dropdownSettings: IDropdownSettings = {};
  

  constructor(
    private profilService: ProfilService,
    private habilitationService: HabilitationService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fetchProfils();
    this.fetchHabilitations();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'libelle',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Deselectionner tout',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: "Pas de donnees",
      searchPlaceholderText: 'Rechercher'
    };
    this.initForm(null);
    
  }
  
  fetchHabilitations(){
    this.habilitationService.getHabilitations([
      (data: any) =>{          
        this.habilitations = data;
      },
      (err: HttpErrorResponse) =>{console.log(err);},
    ]);
  }

  fetchProfils(){
    this.profilService.getProfils([
      (data: any) => {this.profils = data;},
      (err: HttpErrorResponse) => {console.log(err);},
    ]);
  }

  // Profil
  initForm(data: any){
    this.addProfilForm = this.fb.group({
      id: [data?.id],
      code: [data?.code, [Validators.required]],
      libelle: [data?.libelle, [Validators.required]],
      habilitations: [data?.habilitations],
    });
  }

  get f() {return this.addProfilForm.controls;}

  addProfil(){
    this.submitted = false;
    this.initForm(null);
    this.open(this.content);
  }
  
  editProfil(id: number){
    this.profilService.getProfil(id, [
      (data: any) => {
        this.initForm(data);
        this.open(this.content);
      },
      (err: HttpErrorResponse) => {console.log(err);},
    ]);
  }
  
  showDetails(id: number){
    this.profilService.getProfil(id, [
      (data: any) => {
        this.profil = data;
        this.open(this.detail);
      },
      (err: HttpErrorResponse) => {console.log(err);},
    ]);

  }

  onSubmit(){
    this.submitted = true;
    if(!this.addProfilForm.valid)
      return;
    
      interface Body{
        [key: string]: any;
      }

      const data: Body = {
        id: this.addProfilForm.get('id')?.value,
        code: this.addProfilForm.get('code')?.value,
        libelle: this.addProfilForm.get('libelle')?.value,
        habilitations: (this.addProfilForm.get('habilitations')?.value).map((d: any) => d.id),
      }
      console.log(data);
      
      const cbs = [
        (data: any) => {},
        (err: HttpErrorResponse) => {console.log(err);},
      ];     

      if(data.id){
        this.profilService.editUser(data.id, data, cbs);
        this.showSuccessMessage('', 'Le profil a été modifié avec succès.');
      }
      else{
        this.profilService.createUser(data, cbs);
        this.showSuccessMessage('', 'Le profil a été ajouté avec succès.');
      }
      
      this.addModal.close("");
      
    }
    
    statusChanged(elt: any){
      this.profilService.switchStatus(elt, [
        (data: any) => {
          this.showSuccessMessage('', 'L\'action est effectué avec succès.');
        },
      (err: HttpErrorResponse) => {console.log(err);},
    ]);
    
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

  // MultiSelect
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  showSuccessMessage(title: string, text: string){
    Swal.fire({title, text, timer: 3000});
  }
}
