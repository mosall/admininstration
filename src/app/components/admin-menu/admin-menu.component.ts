import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  user: any = {};
  isMenuProfilActive: boolean = false;
  isMenuUserActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  navigateTo(url: string){}
  openModal(){}
  logout(){}
}
