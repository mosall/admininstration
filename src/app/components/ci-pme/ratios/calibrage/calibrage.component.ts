import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-calibrage',
  templateUrl: './calibrage.component.html',
  styleUrls: ['./calibrage.component.css']
})
export class CalibrageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#example').DataTable({
      "language": {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
      }
    });
  }

}
