import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-ratios',
  templateUrl: './ratios.component.html',
  styleUrls: ['./ratios.component.css']
})
export class RatiosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#example').DataTable({
      "language": {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
      }
    });
  }

}
