import { Component } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Toast} from "../../utils/toast";
import {MenuService} from "../../services/menu.service";
import {MenuResponse} from "../../interfaces/menu.interface";

@Component({
  selector: 'home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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
}
