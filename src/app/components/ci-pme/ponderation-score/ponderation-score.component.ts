import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-ponderation-score',
  templateUrl: './ponderation-score.component.html',
  styleUrls: ['./ponderation-score.component.css']
})
export class PonderationScoreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#example').DataTable({
      "language": {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
      }
    });
  }

}
