import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {DatatableSettings} from "../../../settings/datatable.settings";
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
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dtOptions = DatatableSettings.dataTableOptions();

    this.initForms();
  }

  initForms(){
    this.addScoreForm = this.formBuilder.group({
      code: ['', Validators.required],
      parameter: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  get q(){
    return this.addScoreForm.controls;
  }

  saveScore(){
    this.submitted = true;
    if (this.addScoreForm.invalid){
      return;
    }

    const data = {
      code: this.addScoreForm.get('code')?.value,
      parameter: this.addScoreForm.get('parameter')?.value,
      value: this.addScoreForm.get('value')?.value,
    }

    console.log(data)

  }

  getScore(idQuestion: any){}

  deleteScore(idQuestion: any){}

  onUpdateScoreClick(){}

  updateScore(){}

}
