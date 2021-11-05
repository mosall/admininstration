import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EligibilityService} from "../../../services/eligibility.service";
declare var $: any;

@Component({
  selector: 'app-eligibilite',
  templateUrl: './eligibilite.component.html',
  styleUrls: ['./eligibilite.component.css']
})
export class EligibiliteComponent implements OnInit {

  addQuestionEligibilityForm: FormGroup = new FormGroup({});
  submitted = false;

  listQuestions: any = [];

  constructor(private formBuilder: FormBuilder, private eligibilityService: EligibilityService) { }

  ngOnInit(): void {
    $('#example').DataTable({
      "language": {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
      }
    });

    this.initForms();
    this.getQuestion();
  }

  initForms(){
    this.addQuestionEligibilityForm = this.formBuilder.group({
      codeQuestion: ['', Validators.required],
      libelleQuestion: ['', Validators.required]
    });
  }

  get q(){
    return this.addQuestionEligibilityForm.controls;
  }

  saveQuestion(){
    this.submitted = true;
    if (this.addQuestionEligibilityForm.invalid){
      return;
    }

    const data = {
      code: this.addQuestionEligibilityForm.get('codeQuestion')?.value,
      libelle: this.addQuestionEligibilityForm.get('libelleQuestion')?.value,
    }

    this.eligibilityService.saveQuestion(data).subscribe(
      data => {},
      error => {},
    );;

  }

  getQuestion(){
    this.eligibilityService.getQuestion().subscribe(
      data => this.listQuestions = data,
    );
  }

  onUpdateQuestionClick(idQuestion: any){}

  updateQuestion(){}

  deleteQuestion(idQuestion: any){
    this.eligibilityService.deleteQuestion(idQuestion).subscribe(
      data => {},
      error => {},
    );
  }

}
