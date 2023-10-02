import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {LoginUserRequest, LoginUserResponse, ProfileData} from "../../interfaces/user.interface";
import {UserService} from "../../services/user.service";
import {Toast} from "../../utils/toast";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {

  profileData: ProfileData = {
    name: undefined,
    cuit: undefined,
    address: undefined,
    phoneNumber: undefined,
  };

  constructor(private userService: UserService, private toast: Toast) { }

  saveData() {

  }

  ngOnInit() {
    this.userService.getCompanyData().subscribe({
      next: (resp: ProfileData) => {
        this.profileData.name = resp.name
        this.profileData.cuit = resp.cuit
        this.profileData.address = resp.address
        this.profileData.phoneNumber = resp.phoneNumber
      },
      error: (err) => {
        console.log('error: ', err);
        this.toast.present('bottom', 'Usuario o contraseña incorrectos').then();
      },
    });
  }

}
