import {Routes} from "@angular/router";

export const AppRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ci-pme',
        loadChildren: () =>
          import('./components/ci-pme/ci-pme.module').then(m => m.CiPmeModule)
      }
    ]
  },
];
