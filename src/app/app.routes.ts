import { Routes, UrlSegment } from '@angular/router';
import {TokenGuard} from "./guards/token.guard";
import {inject} from "@angular/core";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.page').then( m => m.MenuPage),
    // canMatch: [(route: Routes, segments: UrlSegment[])=> {
    //   let a = inject(TokenGuard).canMatch()
    //   return a
    // }]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'menu-view/:menu-id',
    loadComponent: () => import('./pages/menu-view/menu-view.page').then( m => m.MenuViewPage)
  },
];
