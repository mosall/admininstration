import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EligibilityService} from "../../../services/eligibility.service";
import Swal from "sweetalert2";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {DatatableSettings} from "../../../settings/datatable.settings";
declare var $: any;

@Component({
  selector: 'app-eligibilite',
  templateUrl: './eligibilite.component.html',
  styleUrls: ['./eligibilite.component.css']
})
export class EligibiliteComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective | undefined;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  addQuestionEligibilityForm: FormGroup = new FormGroup({});
  submitted = false;

  listQuestions: any = [];
  codeQuestion = '';
  libelleQuestion = '';
  idQuestion = null;

  constructor(private formBuilder: FormBuilder, private eligibilityService: EligibilityService) { }

  ngOnInit(): void {
    this.dtOptions = DatatableSettings.dataTableOptions();

    this.getQuestion();
  }

  get q(){
    return this.addQuestionEligibilityForm.controls;
  }

  saveQuestion(){
    this.submitted = true;

    if (this.libelleQuestion == ''){
      return;
    }
    else {
      const data = {
        libelle: this.libelleQuestion,
      }

      if(this.idQuestion != null){
        // @ts-ignore
        data.id = this.idQuestion;
        // @ts-ignore
        data.code = this.codeQuestion;
      }

      // @ts-ignore
      const msg = data.id ? "La question a été modifiée avec succès." : "La question a été enregistrée avec succès."

      this.eligibilityService.saveQuestion(data).subscribe(
        data => this.successMsgBox(msg),
        error => this.errorMsgBox(error.error),
      );
    }

  }

  getQuestion(){
    this.eligibilityService.getQuestion().subscribe(
      data => {
        this.listQuestions = data;
        this.dtTrigger.next();
      },
    );
  }

  onUpdateQuestionClick(id: any){
    const question = this.listQuestions.find((param: { id: any; }) => param.id == id);
    this.libelleQuestion = question.libelle;
    this.codeQuestion = question.code;
    this.idQuestion = question.id;
    $('#exampleModalCenter').modal('show');
  }

  deleteQuestion(idQuestion: any){
    Swal.fire({
      title: 'Suppression',
      text: 'Êtes vous sûr de vouloir supprimer cette question ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#006a25',
      cancelButtonColor: '#f78300',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // tslint:disable-next-line:triple-equals
        this.eligibilityService.deleteQuestion(idQuestion).subscribe(
          data => this.successMsgBox("La question a été supprimée."),
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
