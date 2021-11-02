import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CiPmeComponent} from "./ci-pme.component";
import {ParametresComponent} from "./parametres/parametres.component";
import {RatiosComponent} from "./ratios/ratios.component";
import {EligibiliteComponent} from "./eligibilite/eligibilite.component";
import {PonderationScoreComponent} from "./ponderation-score/ponderation-score.component";

const routes: Routes = [
  {
    path: '',
    component: CiPmeComponent,
    // canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: ParametresComponent,
      },
      {
        path: 'parametres',
        component: ParametresComponent,
      },
      {
        path: 'eligibilite',
        component: EligibiliteComponent
      },
      {
        path: 'ratios',
        component: RatiosComponent,
      },
      {
        path: 'ponderation-score',
        component: PonderationScoreComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CiPmeRoutingModule { }
