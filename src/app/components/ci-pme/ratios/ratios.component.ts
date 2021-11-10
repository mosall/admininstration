import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {RatiosService} from "../../../services/ratios.service";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {DatatableSettings} from "../../../settings/datatable.settings";
import Swal from "sweetalert2";
import {$e} from "@angular/compiler/src/chars";
declare var $: any;

@Component({
  selector: 'app-ratios',
  templateUrl: './ratios.component.html',
  styleUrls: ['./ratios.component.css']
})
export class RatiosComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective | undefined;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  listRatios: any = [];

  showValidateIcon = false;
  addOrEditClicked = false;
  fieldId = null;
  ponderation = null;

  constructor(private router: Router, private ratiosService: RatiosService) { }

  ngOnInit(): void {
    this.dtOptions = DatatableSettings.dataTableOptions();

    this.getRatios();
  }

  getRatios(){
    this.ratiosService.getRatios().subscribe(
      data => {
        this.listRatios = data;
        this.dtTrigger.next();
      }
    );
  }

  savePondaration(id: any, code: any, libelle: any, formule: any){

    // @ts-ignore
    if(isNaN(parseInt(this.ponderation.trim()))){
      this.errorMsgBox('Veuillez saisir une valeur correcte.')
    }
    else {
      const data = {
        id,
        code,
        // @ts-ignore
        ponderation: parseInt(this.ponderation.trim()),
        libelle,
        formule
      }

      this.ratiosService.updatePonderation(data).subscribe(
        data => this.successMsgBox("Pondération mise à jour !"),
        error => this.errorMsgBox(error.error),
      );
    }
  }

  getPonderationValue(event: any){
    this.ponderation = event.target.value;
  }

  goto(url: string){
    this.router.navigateByUrl(url);
  }

  enableAddOrEdit(id: any){
    this.addOrEditClicked = true;
    this.fieldId = id;
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

