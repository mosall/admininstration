import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { PonderationService } from 'src/app/services/ponderation.service';
import { DatatableSettings } from 'src/app/settings/datatable.settings';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-ponderation-score',
  templateUrl: './ponderation-score.component.html',
  styleUrls: ['./ponderation-score.component.css']
})
export class PonderationScoreComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective | undefined;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  
  addScoreForm: FormGroup = new FormGroup({});
  submitted = false;
  
  listPonderation: any = [];
   code: any = "";
   idParametre: any = null;
   valeur: any = null;
   idPonderation: any = null;

  constructor(private formBuilder: FormBuilder, private ponderationService: PonderationService) { }

  ngOnInit(): void {
    this.dtOptions = DatatableSettings.dataTableOptions();
    this.getPonderation();
  }
 
  savePonderation(){
    this.submitted = true;
    console.log(this.idParametre);

    if (this.code == '' || isNaN(this.idParametre) || this.idParametre == null || isNaN(this.valeur) || this.valeur == null ){
      return;
    }
    else {
      const data = {
        code_score: this.code,
        idParametre: this.idParametre,
        ponderation: this.valeur
      }



      if(this.idPonderation != null){
        // @ts-ignore
        data.id = this.idPonderation;
      }

      // @ts-ignore
      const msg = data.id ? "La pondération a été modifiée avec succès." : "La pondération a été enregistrée avec succès."

      this.ponderationService.savePonderation(data).subscribe(
        data => this.successMsgBox(msg),
        error => this.errorMsgBox(error.error),
      );

      

    }
  }

  getPonderation(){
    this.ponderationService.getPonderation().subscribe(
      data => {
        this.listPonderation = data;
        this.dtTrigger.next();
      }
    );
  }

  deletePonderation(idQuestion: any){
    Swal.fire({
    title: 'Suppression',
    text: 'Êtes vous sûr de vouloir supprimer la pondération ?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#006a25',
    cancelButtonColor: '#f78300',
    confirmButtonText: 'Oui',
    cancelButtonText: 'Annuler'
      }).then((result) => {
      if (result.isConfirmed) {
        // tslint:disable-next-line:triple-equals
        this.ponderationService.deletePonderation(idQuestion).subscribe(
          data => this.successMsgBox("La pondération a été supprimée."),
          error => this.errorMsgBox(error.error),
        );
      }
    });
  }


  onUpdateScoreClick(id: any){
    const ponderation = this.listPonderation.find((param: { id: any; }) => param.id == id);
    this.code = ponderation.code_score;
    this.idParametre = ponderation.parametreDTO.id;
    this.valeur = ponderation.ponderation;
    this.idPonderation = id;
  }

  successMsgBox(msg: any){
    Swal.fire({
      icon: 'success',
      text: msg,
      showConfirmButton: false,
      timer: 1500
    }).then(
      ()=> window.location.reload()
    );
  }

  errorMsgBox(msg: any){
    Swal.fire({
      icon: 'warning',
      text: msg,
      showConfirmButton: false,
      timer: 2500
    });
  }

  isNan(value: any){
    return isNaN(value);
  }

}
