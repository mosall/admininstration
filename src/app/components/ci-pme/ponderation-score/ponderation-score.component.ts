import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatableSettings } from 'src/app/settings/datatable.settings';
import Swal from 'sweetalert2';
import {ScoreService} from "../../../services/score.service";
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

  showValidateIcon = false;
  ponderation = null;


  constructor(private formBuilder: FormBuilder, private ponderationService: ScoreService) { }

  ngOnInit(): void {
    this.dtOptions = DatatableSettings.dataTableOptions();
    this.getPonderation();
  }

  savePonderation(id: any, idParametre: any, ponderation: any, typeScore: any){
    // @ts-ignore
    if(isNaN(parseInt(this.ponderation.trim()))){
      this.errorMsgBox('Veuillez saisir une valeur correcte.')
    }
    else {
      const data = {
        id,
        idParametre,
        // @ts-ignore
        ponderation: parseInt(this.ponderation.trim()),
        typeScore
      }

      this.ponderationService.updatePonderation(data).subscribe(
        data => this.successMsgBox("Pondération mise à jour !"),
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

  getPonderationValue(event: any){
    this.ponderation = event.target.value;
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

}
