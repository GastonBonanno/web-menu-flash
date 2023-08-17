import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule, NavController} from '@ionic/angular';
import {LoginUserRequest, LoginUserResponse} from "../../interfaces/user.interface";
import {CategoryRequest, ItemMenuRequest, MenuRequest} from "../../interfaces/menu.interface";
import {UserService} from "../../services/user.service";
import {Toast} from "../../utils/toast";
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MenuPage implements OnInit {

  menu: MenuRequest = {
    title: '',
    description: '',
    header: '',
    footer: ''
  };

  category: CategoryRequest = {
    name: '',
    menuId: 0
  };

  itemMenu: ItemMenuRequest = {
    categoryMenuId: 0,
    name: '',
    description: '',
    price: 0,
    quantity: 0
  };

  listCategory: CategoryRequest[] = [];

  constructor(private menuService: MenuService,  private toast: Toast) { }

  save() {
    this.menuService.save(this.menu).subscribe({
      next: () => {
        this.toast.present('middle', "Cargado con éxito")
      },
      error: (err) => {
        console.log('error: ', err)
      }
    })
  }

  addCategory() {
    this.listCategory.push(this.category)
    //this.category.name= ''
    //this.category.menuId = 0
  }

  ngOnInit() {
  }

}
