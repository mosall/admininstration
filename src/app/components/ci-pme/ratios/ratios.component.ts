import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RatiosService} from "../../../services/ratios.service";
declare var $: any;

@Component({
  selector: 'app-ratios',
  templateUrl: './ratios.component.html',
  styleUrls: ['./ratios.component.css']
})
export class RatiosComponent implements OnInit {

  listRatios: any = [];

  constructor(private router: Router, private ratiosService: RatiosService) { }

  ngOnInit(): void {
    $('#example').DataTable({
      "language": {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
      }
    });

    // this.getRatios();
  }

  getRatios(){
    this.ratiosService.getRatios().subscribe(
      data => this.listRatios = data
    );
  }

  goto(url: string){
    this.router.navigateByUrl(url);
  }

}
