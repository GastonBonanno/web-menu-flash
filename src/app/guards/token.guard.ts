import {Injectable} from '@angular/core';
import {CanLoad, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "../services/user.service";
import {LoginUserResponse} from "../interfaces/user.interface";
import {TokenService} from "../services/token.service";
import {NavController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class TokenGuard{

  constructor( private userService: UserService, private tokenService: TokenService, private navCtrl: NavController) { }

  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('canLoadddddddddddddddddddddddddd')
    this.userService.validateToken().subscribe({
      next: (resp: LoginUserResponse) => {
        console.log('ok funciona: ')
        return true
      },
      error: (err) => {
        console.log('Error al validar token')
        this.tokenService.clearToken().then();
        this.navCtrl.navigateRoot('/login', {animated: true}).then();
      }
    })
    return false
  }

}
