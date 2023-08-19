import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ActionSheetController, CheckboxCustomEvent, IonicModule, NavController} from '@ionic/angular';
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
  listItem: ItemMenuRequest[] = [];
  isModalOpen = false;
  isModalOpen2 = false;
  isModalOpen3 = false;

  itemSrc: string = '/assets/comida.png';
  constructor(private menuService: MenuService,  private toast: Toast, private actionSheetCtrl: ActionSheetController) { }

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
    let categoryClone: CategoryRequest = {
      name: this.category.name,
      menuId: this.category.menuId,
    }
    this.listCategory.push(categoryClone)
  }

  saveCategory(){}

  addItem() {
    this.listItem.push(this.itemMenu)
    this.itemMenu.categoryMenuId= 0
    this.itemMenu.name = ""
    this.itemMenu.description = ""
    this.itemMenu.price = 0
    this.itemMenu.quantity = 0
  }
  saveItems(){}

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setOpen2(isOpen: boolean) {
    this.isModalOpen2 = isOpen;
  }
  setOpen3(isOpen: boolean) {
    this.isModalOpen3 = isOpen;
  }

  ngOnInit() {

  }

}
