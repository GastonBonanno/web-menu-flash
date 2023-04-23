import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard {

  // constructor( private usuarioService: UsuarioService ) { }

  // canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return false;
  // }

  // canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return this.usuarioService.validateToken();
  // }

}
