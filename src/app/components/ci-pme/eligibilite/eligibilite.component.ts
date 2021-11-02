import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-eligibilite',
  templateUrl: './eligibilite.component.html',
  styleUrls: ['./eligibilite.component.css']
})
export class EligibiliteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#example').DataTable({
      "language": {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
      }
    });
  }

}
