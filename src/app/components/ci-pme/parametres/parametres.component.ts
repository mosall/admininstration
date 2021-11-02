import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit {

  dtOptions: any = {};
  constructor() { }

  ngOnInit(): void {
    // this.dtOptions = DatatableSettings.dataTableOptions();
    $('#example').DataTable({
      "language": {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
      },
      "paging":   false,
    });
  }

}
