import {Injectable} from '@angular/core';
import {CanMatchFn, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
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

  canActivate:CanMatchFn = this.canMatch;

  /*const isAuthenticated = (): | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.isAuthenticated$.pipe(
        take(1),
        tap((isAuthenticated: boolean) => {
            if (!isAuthenticated) {
                this.router.navigate(['/account/login']);
            }
        }),
    );
}

const canActivate:CanActivateFn = isAuthenticated;
const canMatch:CanMatchFn = isAuthenticated;
  */

}
