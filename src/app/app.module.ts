import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {AppRoutes} from "./app.routing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ParametresService} from "./services/parametres.service";
import {HttpClientModule} from "@angular/common/http";
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, DataTablesModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [ParametresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
