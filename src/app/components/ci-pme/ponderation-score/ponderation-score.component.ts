import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
declare var $: any;

@Component({
  selector: 'app-ponderation-score',
  templateUrl: './ponderation-score.component.html',
  styleUrls: ['./ponderation-score.component.css']
})
export class PonderationScoreComponent implements OnInit {

  addScoreForm: FormGroup = new FormGroup({});
  submitted = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    $('#example').DataTable({
      "language": {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
      }
    });

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
