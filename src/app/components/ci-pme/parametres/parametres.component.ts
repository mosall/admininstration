import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ParametresService} from "../../../services/parametres.service";
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit {

  submitted = false;
  submittedQ = false;
  submittedR = false;

  listParameters: any = [];
  listQuestions: any = [];
  listReponses: any = [];

  code = '';
  libelle = '';
  nbQuestion = 0;
  idParameter = null;

  codeQuestion = '';
  libelleQuestion = '';
  idQuestion = null;

  codeReponse = ''
  libelleReponse = '';
  scoreReponse: any = '';
  idReponse = null;
  question: any;

  constructor(private formBuilder: FormBuilder, private parametresService: ParametresService) { }

  ngOnInit(): void {
    // this.dtOptions = DatatableSettings.dataTableOptions();
    $('#example').DataTable({
      "language": {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
      },
      "paging":   false,
    });

    this.getParameters();
  }


  saveParam(){
    this.submitted = true;
    if (this.libelle == '' || this.nbQuestion == 0 || !this.nbQuestion){
      return;
    }
    else {
      const data = {
        libelle: this.libelle,
        nbreQuestion: this.nbQuestion
      }

      if(this.idParameter != null){
        // @ts-ignore
        data.id = this.idParameter;
        // @ts-ignore
        data.code = this.code;
      }

      // @ts-ignore
      const msg = data.id ? "Le paramètre a été modifié avec succès." : "Le paramètre a été enregistré avec succès."

      this.parametresService.saveParameter(data).subscribe(
        (data: any) => { 
          this.listParameters.push(data);
          this.getQuestion(data.id);
          this.libelle = '';
          this.nbQuestion = 0;
          this.submitted = false;
          this.successAddParametre(msg, data.code);
        },
        error => this.errorMsgBox(error.error),
      );

      this.idParameter = null;
    }
  }

  getParameters(){
    this.parametresService.getParameter().subscribe(
      data => {
        this.listParameters = data;
        this.listParameters.sort((a: any, b: any) => a.id > b.id);
        this.getQuestion(1);
      }
    );
  }
  
  deleteParameter(idParameter: any){
    Swal.fire({
      title: 'Suppression',
      text: 'Êtes vous sûr de vouloir supprimer ce paramètre ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#006a25',
      cancelButtonColor: '#f78300',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // tslint:disable-next-line:triple-equals
        this.parametresService.deleteParameter(idParameter).subscribe(
          data => {
            this.successMsgBox("Le paramètre a été supprimé.");
            window.location.reload();
          },
          error => this.errorMsgBox(error.error),
        );
      }
    });
  }

  onUpdateParameterClick(id: any){
    const parameter = this.listParameters.find((param: { id: any; }) => param.id == id);
    this.code = parameter.code;
    this.libelle = parameter.libelle;
    this.nbQuestion = parameter.nbre_question;
    this.idParameter = parameter.id;
    $('#exampleModalCenter').modal('show');
  }

  saveQuestion(idParametre: any){
    this.submittedQ = true;

    if (this.libelleQuestion == ''){
      return;
    }
    else {
      const data = {
        libelle: this.libelleQuestion,
        idParametre
      }

      if(this.idQuestion != null){
        // @ts-ignore
        data.id = this.idQuestion;
        // @ts-ignore
        data.code = this.codeQuestion;
      }

      // @ts-ignore
      const msg = data.id ? "La question a été modifiée avec succès." : "La question a été enregistrée avec succès."
            
      this.parametresService.saveQuestion(data).subscribe(
        data => {
          this.successMsgBox(msg);
          this.getQuestion(idParametre);
          this.submittedQ = false;
          this.libelleQuestion = '';
        },
        error => this.errorMsgBox(error.error),
      );
    }
  }

  getQuestion(idParameter: any){
    this.parametresService.getQuestionByParameter(idParameter).subscribe(
      data => {
        this.listQuestions = data;
      },
    );
  }

  deleteQuestion(question: any){
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
        this.parametresService.deleteQuestion(question.id).subscribe(
          data => {            
            this.getQuestion(question?.parametreDTO?.id);
            this.successMsgBox("La question a été supprimée.")
        },
          error => this.errorMsgBox(error.error),
        );
      }
    });
  }

  onUpdateQuestionClick(id: any){
    const question = this.listQuestions.find((param: { id: any; }) => param.id == id);
    this.codeQuestion = question.code;
    this.libelleQuestion = question.libelle;
    this.idQuestion = question.id;
  }

  onAddReponseClick(q: any){
    this.question = q;
    this.idQuestion = q.id;
    $('#addReponseModal').modal('show');
  }

  saveReponse(){
    this.submittedR = true;

    if (isNaN(this.scoreReponse) || this.scoreReponse < 1 || this.scoreReponse > 5 || this.libelleReponse == ''){
      return;
    }
    else {
      const data = {
        libelle: this.libelleReponse,
        score: this.scoreReponse,
        idQuestion: this.idQuestion
      }

      if(this.idReponse != null){
        // @ts-ignore
        data.id = this.idReponse;
        // @ts-ignore
        data.code = this.codeReponse;
        // @ts-ignore
      }

      // @ts-ignore
      const msg = data.id ? "La réponse a été modifiée avec succès." : "La réponse a été enregistrée avec succès."

      this.parametresService.saveReponse(data).subscribe(
        data => {
          this.successMsgBox(msg);
          console.log('Q', this.question);
          
          this.getQuestion(this.question?.parametreDTO?.id);
          this.submittedR = false;
          this.libelleReponse = '';
          this.scoreReponse = '';
          this.idQuestion = null;
        },
        error => this.errorMsgBox(error.error),
      );
    }
  }

  getReponse(idQuestion: any){
    this.parametresService.getReponseByQuestion(idQuestion).subscribe(
      data => {
        this.listReponses = data;
      },
      error => {}
    );
  }

  deleteReponse(reponse: any){
    Swal.fire({
      title: 'Suppression',
      text: 'Êtes vous sûr de vouloir supprimer cette réponse ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#006a25',
      cancelButtonColor: '#f78300',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // tslint:disable-next-line:triple-equals
        this.parametresService.deleteReponse(reponse.id).subscribe(
          data => {
            this.getQuestion(reponse?.questionDTO?.parametreDTO?.id);
            this.successMsgBox("La réponse a été supprimée.")
        },
          error => this.errorMsgBox(error.error),
        );
      }
    });
  }

  onUpdateReponseClick(idReponse: any, score: any, code: any, libelle: any, idQuestion: any){
    this.codeReponse = code;
    this.libelleReponse = libelle;
    this.scoreReponse = score;
    this.idReponse = idReponse;
    this.idQuestion = idQuestion;
    $('#addReponseModal').modal('show');
  }

  updateReponse(){}

  activateTab(id: any){    
    $('a[href*="#'+id+'"]').trigger('click');
  }

  successMsgBox(msg: any){
    Swal.fire({
      icon: 'success',
      text: msg,
      showConfirmButton: false,
      timer: 5000
    }).then(
      // ()=> window.location.reload()
    );
  }
  successAddParametre(msg: any, id: any){
    Swal.fire({
      icon: 'success',
      text: msg,
      showConfirmButton: false,
      timer: 5000
    }).then(
      ()=> this.activateTab(id)
    );
  }

  errorMsgBox(msg: any){
    Swal.fire({
      icon: 'warning',
      text: msg,
      showConfirmButton: false,
      timer: 5000
    });
  }

  isNan(value: any){
    return isNaN(value);
  }
}
