import {Route, Routes, UrlSegment} from '@angular/router';
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
    canMatch: [(route: Route, segments: UrlSegment[])=> inject(TokenGuard).canMatch()]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage),
    canMatch: [(route: Route, segments: UrlSegment[])=> inject(TokenGuard).canMatch()]
  },
  {
    path: 'menu-view/:menu-id',
    loadComponent: () => import('./pages/menu-view/menu-view.page').then( m => m.MenuViewPage),
    canMatch: [(route: Route, segments: UrlSegment[])=> inject(TokenGuard).canMatch()]
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage),
    canMatch: [(route: Route, segments: UrlSegment[])=> inject(TokenGuard).canMatch()]
  },
  {
    path: 'tables',
    loadComponent: () => import('./pages/qr-tables/qr-tables.page').then( m => m.QrTablesPage),
    canMatch: [(route: Route, segments: UrlSegment[])=> inject(TokenGuard).canMatch()]
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
  },
  {
    path: 'page-not-found',
    loadComponent: () => import('./pages/page-not-found/page-not-found.page').then( m => m.PageNotFoundPage)
  }
];
