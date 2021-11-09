import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {RatiosService} from "../../../services/ratios.service";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {DatatableSettings} from "../../../settings/datatable.settings";
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

  goto(url: string){
    this.router.navigateByUrl(url);
  }

  enableAddOrEdit(id: any){
    this.addOrEditClicked = true;
    this.fieldId = id;
    console.log(id)
  }

}
