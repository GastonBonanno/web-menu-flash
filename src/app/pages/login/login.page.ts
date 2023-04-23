import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
// import { NavController } from '@ionic/angular';
// import { UiServiceService } from 'src/app/services/ui-service.service';
// import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {

  // @ViewChild('mainSlide') slides: IonSlides;

  itemSrc = '/assets/logo.png';

  loginUser = {
    userId: 1,
    userPass: 'pass'
  };

  newPasswords = {
    newPass: '',
    repeatPass: ''
  };
  // constructor( private usuarioService: UsuarioService,
  //              private navCtrl: NavController,
  //              private uiService: UiServiceService ) { }


  ngOnInit() {
    // this.usuarioService.clearToken();
  }

  ngAfterViewInit() {
    // this.slides.lockSwipes(true);
  }

  async login( fLogin: NgForm ) {
    //
    // if ( fLogin.invalid ) {return;}
    //
    // // let response  = {isEmptyPass: false, isLogin: false};
    //
    // const response = await this.usuarioService.login ( this.loginUser.userId, this.loginUser.userPass);
    //
    // if(response[0]) {
    //   this.slideTo(1);
    // } else if(response[1]) {
    //   console.log('response1: '+ response[1]);
    //   this.navCtrl.navigateRoot( '/home' , {animated: true});
    // } else {
    //   this.uiService.alertInfo('Usuario o contraseña incorrectos');
    // }
  }

  async updatePassword( fPasswords: NgForm ) {

    // if( this.newPasswords.newPass == null || this.newPasswords.newPass === '') {
    //   this.uiService.alertInfo('Ingrese una contraseña');
    //   return;
    // }
    // if( this.newPasswords.newPass !== this.newPasswords.repeatPass) {
    //   this.uiService.alertInfo('Las contraseñas ingresadas no son iguales');
    //   return;
    // }
    //
    // const validLogin = await this.usuarioService.updatePassword (this.loginUser.userId, this.newPasswords.newPass);
    // if(validLogin) {
    //   await this.uiService.presentToast('bottom', 'Contraseña actualizada correctamente');
    //   // await this.uiService.alertInfoHandler('Contraseña actualizada correctamente', () => this.slideTo(0));
    // } else {
    //   await this.uiService.presentToast('bottom', 'Error al guardar, intentelo nuevamente mas tarde');
    //   // await this.uiService.alertInfoHandler('Error al guardar, intentelo nuevamente mas tarde', () => this.slideTo(0));
    // }
    //
    // await this.slideTo(0);
  }

  // private async slideTo(i: number){
  //   this.slides.lockSwipes( false );
  //   this.slides.slideTo(i);
  //   this.slides.lockSwipes( true );
  // }

  // private async toGuestPage(){
  //   this.navCtrl.navigateRoot('/guest', {animated: true});
  // }


}
