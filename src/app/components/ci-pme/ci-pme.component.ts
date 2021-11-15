import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ci-pme',
  templateUrl: './ci-pme.component.html',
  styleUrls: ['./ci-pme.component.css']
})
export class CiPmeComponent implements OnInit {

  isShowing = true;

  constructor() {
  }

  ngOnInit(): void {

  }

  toggleSidenav() {
    this.isShowing = !this.isShowing;
  }

}
