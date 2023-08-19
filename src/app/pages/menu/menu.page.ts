import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {CategoryRequest, ItemMenuRequest, MenuRequest} from "../../interfaces/menu.interface";
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
    let categoryClone: CategoryRequest = {
      name: this.category.name,
      menuId: this.category.menuId,
    }
    this.listCategory.push(categoryClone)
  }

  saveCategory(){}

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
