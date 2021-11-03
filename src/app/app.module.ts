import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/admin/users/users.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfilsComponent } from './components/admin/profils/profils.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { RouterModule } from '@angular/router';
import appRoutes from './app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from './utils/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgToggleModule } from 'ng-toggle-button';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    ProfilsComponent,
    AdminMenuComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgToggleModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
