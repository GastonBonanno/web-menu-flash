import {Injectable} from '@angular/core';
import {CanMatchFn, UrlTree} from '@angular/router';
import {map, mergeMap, Observable, of, tap} from 'rxjs';
import {UserService} from "../services/user.service";
import {LoginUserResponse} from "../interfaces/user.interface";
import {TokenService} from "../services/token.service";
import {NavController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class TokenGuard {

  constructor( private userService: UserService, private tokenService: TokenService, private navCtrl: NavController) { }



  canMatch(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('canLoadddddddddddddddddddddddddd')
    return this.userService.validateToken().pipe(
      mergeMap((resp: LoginUserResponse) => {
        console.log('resp: ', resp)
        return of(true)
      }),
    )



    // console.log('canLoadddddddddddddddddddddddddd')
    // let isValid: boolean = false
    // this.userService.validateToken().subscribe({
    //   next: (resp: LoginUserResponse) => {
    //     console.log('ok funciona: ')
    //     isValid = true
    //   },
    //   error: (err) => {
    //     console.log('Error al validar token')
    //     this.tokenService.clearToken().then();
    //     this.navCtrl.navigateRoot('/login', {animated: true}).then();
    //   }
    // })
    // console.log('isValid::: ', isValid)
    // return isValid
  }

  // canActivate:CanMatchFn = this.canMatch;
}
