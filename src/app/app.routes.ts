import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/home/home-module').then(m => m.HomeModule),
  }
];
