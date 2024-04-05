import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule, NavController} from '@ionic/angular';
import {MenuService} from "../../services/menu.service";
import {Toast} from "../../utils/toast";
import {UserService} from "../../services/user.service";
import {MenuResponse} from "../../interfaces/menu.interface";
import {ProfileData} from "../../interfaces/user.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  datetime: any;
  profileData: ProfileData = {
    name: undefined,
    cuit: undefined,
    address: undefined,
    phoneNumber: undefined,
  };


  constructor(private userService: UserService, menuService: MenuService, private navCtrl: NavController, private toast: Toast) {
  }

  navigateTo(path: string){
    this.navCtrl.navigateRoot(path, {animated: true}).then()
  }
  ngOnInit() {
    this.userService.getCompanyData().subscribe({
      next: (resp: ProfileData) => {
        this.profileData.name = resp.name
    },
      error: (err) =>{
        console.log('error',err);
        this.toast.present('bottom', 'Error al obtener datos del perfil').then();
      },
    });
  }
}
