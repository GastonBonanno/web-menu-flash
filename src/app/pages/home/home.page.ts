import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule, NavController} from '@ionic/angular';
import {MenuService} from "../../services/menu.service";
import {Toast} from "../../utils/toast";
import {MenuResponse} from "../../interfaces/menu.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {


  constructor(private menuService: MenuService, private navCtrl: NavController, private toast: Toast) {
  }

  testBack() {
    this.menuService.getMenu().subscribe({
      next: (resp: MenuResponse) => {
        console.log(resp)
      },
      error: (err) => {
        console.log('error: ', err)
      }
    })
  }
  ngOnInit() {
  }

}
