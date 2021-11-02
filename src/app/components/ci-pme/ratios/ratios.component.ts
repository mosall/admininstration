import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-ratios',
  templateUrl: './ratios.component.html',
  styleUrls: ['./ratios.component.css']
})
export class RatiosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    $('#example').DataTable({
      "language": {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
      }
    });
  }

  goto(url: string){
    this.router.navigateByUrl(url);
  }

}
