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
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage),
    canMatch: [(route: Routes, segments: UrlSegment[])=>inject(TokenGuard).canMatch]
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.page').then( m => m.MenuPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
];
