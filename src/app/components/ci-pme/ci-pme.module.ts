import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiPmeRoutingModule } from './ci-pme-routing.module';
import { CiPmeComponent } from './ci-pme.component';
import { LayoutComponent } from './layout/layout.component';
import {ParametresComponent} from "./parametres/parametres.component";
import {RatiosComponent} from "./ratios/ratios.component";
import { EligibiliteComponent } from './eligibilite/eligibilite.component';
import { PonderationScoreComponent } from './ponderation-score/ponderation-score.component';
import { CalibrageComponent } from './ratios/calibrage/calibrage.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataTablesModule} from "angular-datatables";
import { NgbDropdown, NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    CiPmeComponent,
    LayoutComponent,
    ParametresComponent,
    RatiosComponent,
    EligibiliteComponent,
    PonderationScoreComponent,
    CalibrageComponent
  ],
  imports: [
    CommonModule,
    CiPmeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    NgbModule
  ]
})
export class CiPmeModule { }
