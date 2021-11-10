import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableSettings} from "../../../../settings/datatable.settings";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {CalibrageService} from "../../../../services/calibrage.service";
import {ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";
declare var $: any;

@Component({
  selector: 'app-calibrage',
  templateUrl: './calibrage.component.html',
  styleUrls: ['./calibrage.component.css']
})
export class CalibrageComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective | undefined;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  listCalibrage: any = [];
  idRatio: any = null;

  idCalibrage = null;
  classe: any = '';
  min: any = '';
  max: any = '';
  submitted = false;

  constructor(private calibrageService: CalibrageService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.dtOptions = DatatableSettings.dataTableOptions();
    this.idRatio = this.activateRoute.snapshot.paramMap.get('idRatio');
    this.getCalibrage();
  }

  getCalibrage(){
    this.calibrageService.getCalibrage(this.idRatio).subscribe(
      data => {
        this.listCalibrage = data;
        this.dtTrigger.next();
      }
    );
  }

  saveCalibrage(){
    this.submitted = true;
    if(this.classe < 1 || this.classe > 5 || isNaN(this.min) || isNaN(this.max)){
      return;
    }
    else {
      const data = {
        classe: this.classe,
        min: this.min,
        max: this.max,
        idRatio: this.idRatio
      }

      if(this.idCalibrage != null){
        // @ts-ignore
        data.id = this.idCalibrage;
      }

      // @ts-ignore
      const msg = data.id ? "Le calibrage a été modifié avec succès." : "Le calibrage a été enregistré avec succès."

      this.calibrageService.saveCalibrage(data).subscribe(
        data => this.successMsgBox(msg),
        error => this.errorMsgBox(error.error),
      );
    }
  }

  onUpdateQuestionClick(id: any){
    const calibrage = this.listCalibrage.find((param: { id: any; }) => param.id == id);
    this.classe = calibrage.classe;
    this.max = calibrage.max;
    this.min = calibrage.min;
    this.idCalibrage = calibrage.id;
    $('#exampleModalCenter').modal('show');
  }

  deleteCalibrage(idQuestion: any){
    Swal.fire({
      title: 'Suppression',
      text: 'Êtes vous sûr de vouloir supprimer ce calibrage ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#006a25',
      cancelButtonColor: '#f78300',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // tslint:disable-next-line:triple-equals
        this.calibrageService.deleteCalibrage(idQuestion).subscribe(
          data => this.successMsgBox("Le calibrage a été supprimé."),
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

  isNan(value: any){
    return isNaN(value);
  }
}
