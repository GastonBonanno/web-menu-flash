import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  CreateUserRequest, CreateUserResponse,
  LoginUserRequest,
  LoginUserResponse
} from "../../interfaces/user.interface";
import {UserService} from "../../services/user.service";
import {IonModal, NavController} from "@ionic/angular";
import {Toast} from "../../utils/toast";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  itemSrc: string = '/assets/logo.png';

  loginUser: LoginUserRequest = {
    email: '',
    password: ''
  };

  userToCreate: CreateUserRequest = {
    email: '',
    password: '',
    repeatedPassword: ''
  };

  constructor(private userService: UserService, private navCtrl: NavController, private toast: Toast) {
  }

  login() {
    this.userService.login(this.loginUser).subscribe({
        next: (resp: LoginUserResponse) => {
          this.navCtrl.navigateRoot('/home', {animated: true})
          return resp
        },
        error: (err) => {
          console.log('error: ', err)
        }
      })
  }

  async createUser(modal: IonModal) {
    this.userService.createUser(this.userToCreate).subscribe({
      next: (resp: CreateUserResponse) => {
        this.toast.present('bottom', "Usuario creado correctamente")
        modal.dismiss()
        return resp
      },
      error: (err) => {
        console.log('error createUser: ', err)
        this.toast.present('bottom', "Error al crear usuario")
        modal.dismiss()
      }
    })
  }
}
