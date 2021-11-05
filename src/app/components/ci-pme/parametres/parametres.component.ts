import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ParametresService} from "../../../services/parametres.service";
declare var $: any;

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit {

  addParamForm: FormGroup = new FormGroup({});
  addQuestionForm: FormGroup = new FormGroup({});
  addReponseForm: FormGroup = new FormGroup({});
  submitted = false;
  submittedQ = false;
  submittedR = false;

  listParameters: any = [];
  listQuestions: any = [];
  listReponses: any = [];

  constructor(private formBuilder: FormBuilder, private parametresService: ParametresService) { }

  ngOnInit(): void {
    // this.dtOptions = DatatableSettings.dataTableOptions();
    $('#example').DataTable({
      "language": {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
      },
      "paging":   false,
    });

    this.initForms();
    this.getParameters();
  }

  initForms(){
    this.addParamForm = this.formBuilder.group({
      code: ['', Validators.required],
      libelle: ['', Validators.required],
      nbQuestion: ['', [Validators.required, Validators.min(1)]],
    });

    this.addQuestionForm = this.formBuilder.group({
      codeQuestion: ['', Validators.required],
      libelleQuestion: ['', Validators.required]
    });

    this.addReponseForm = this.formBuilder.group({
      codeReponse: ['', Validators.required],
      libelleReponse: ['', Validators.required],
      scoreReponse: ['', Validators.required]
    });
  }

  get f(){
    return this.addParamForm.controls;
  }

  get q(){
    return this.addQuestionForm.controls;
  }

  saveParam(){
    this.submitted = true;
    if (this.addParamForm.invalid){
      return;
    }

    const data = {
      code: this.addParamForm.get('code')?.value,
      libelle: this.addParamForm.get('libelle')?.value,
      nbreQuestion: this.addParamForm.get('nbQuestion')?.value
    }

    this.parametresService.saveParameter(data).subscribe(
      data => {},
      error => {},
    );
  }

  getParameters(){
    this.parametresService.getParameter().subscribe(
      data => {
        this.listParameters = data;
        console.log("da" + data);
      },
      error => {}
    );
  }

  deleteParameter(idParameter: any){
    this.parametresService.deleteParameter(idParameter).subscribe(
      data => {},
      error => {},
    );
  }

  onUpdateParameterClick(){}

  updateParameter(){}


  saveQuestion(){
    this.submittedQ = true;
    if (this.addQuestionForm.invalid){
      return;
    }

    const data = {
      code: this.addQuestionForm.get('codeQuestion')?.value,
      libelle: this.addQuestionForm.get('libelleQuestion')?.value,
      idParametre: "1",
    }

    this.parametresService.saveQuestion(data).subscribe(
      data => {},
      error => {},
    );;
  }

  getQuestion(idParameter: any){
    this.parametresService.getQuestionByParameter(idParameter).subscribe(
      data => this.listQuestions = data,
      error => {}
    );
  }

  deleteQuestion(idQuestion: any){
    this.parametresService.deleteQuestion(idQuestion).subscribe(
      data => {},
      error => {},
    );
  }

  onUpdateQuestionClick(){}

  updateQuestion(){}

  saveReponse(){
    this.submittedR = true;
    if (this.addReponseForm.invalid){
      return;
    }

    const data = {
      code: this.addReponseForm.get('codeReponse')?.value,
      libelle: this.addReponseForm.get('libelleReponse')?.value,
      idQuestion: "",
      score: this.addReponseForm.get('scoreReponse')?.value,
    }

    this.parametresService.saveReponse(data).subscribe(
      data => {},
      error => {},
    );;
  }

  getReponse(idQuestion: any){
    this.parametresService.getReponseByQuestion(idQuestion).subscribe(
      data => this.listReponses = data,
      error => {}
    );
  }

  deleteReponse(idReponse: any){
    this.parametresService.deleteReponse(idReponse).subscribe(
      data => {},
      error => {},
    );
  }

  onUpdateReponseClick(){}

  updateReponse(){}

}
