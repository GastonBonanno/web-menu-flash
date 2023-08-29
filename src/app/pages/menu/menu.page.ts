import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, NavController} from '@ionic/angular';
import {CategoryRequest, ItemMenuRequest, MenuRequest, MenuResponse} from "../../interfaces/menu.interface";
import {Toast} from "../../utils/toast";
import {MenuService} from "../../services/menu.service";
import {LoginUserResponse} from "../../interfaces/user.interface";

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

  menuResponse: MenuResponse = {
    id: 0,
    title: '',
    description: '',
    header: '',
    footer: '',
    companyDataId: 0,
    active: true,
    createdAt: null,
    modifiedAt: null,
    deletedAt: null
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
  listMenu: MenuResponse[] = [{
    id: 0,
    title: '',
    description: '',
    header: '',
    footer: '',
    companyDataId: 0,
    active: true,
    createdAt: null,
    modifiedAt: null,
    deletedAt: null
  },
    {
      id: 0,
      title: '',
      description: '',
      header: '',
      footer: '',
      companyDataId: 0,
      active: true,
      createdAt: null,
      modifiedAt: null,
      deletedAt: null
    }];
  isModalOpen = false;
  isModalOpen2 = false;
  isModalOpen3 = false;

  constructor(private menuService: MenuService,  private toast: Toast, private navCtrl: NavController) { }

  saveMenu() {
    this.menuService.saveMenu(this.menu).subscribe({
      next: (resp: MenuResponse) => {
        this.navCtrl.navigateRoot('/menu-view', {animated: true})
        return resp
      },
      error: (err) => {
        this.toast.present('bottom', "Error menu").then()
        console.log('error: ', err)
      }
    })
  }
  addCategory() {
    let categoryClone: CategoryRequest = {
      name: this.category.name,
      menuId: this.menuResponse.id
    }
    this.listCategory.push(categoryClone)
  }

   saveCategory() {
  //   this.menuService.saveCategory(this.listCategory).subscribe({
  //     next: (resp: MenuResponse) => {
  //       this.toast.present('bottom', "Cargado con éxito").then()
  //       this.menuResponse = resp
  //     },
  //     error: (err) => {
  //       console.log('error: ', err)
  //     }
  //   })
   }

  addItem() {
    let itemClone: ItemMenuRequest = {
      categoryMenuId: this.itemMenu.categoryMenuId,
      name: this.itemMenu.name,
      description: this.itemMenu.description,
      price: this.itemMenu.price,
      quantity: this.itemMenu.quantity
    }
    this.listItem.push(itemClone)
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
