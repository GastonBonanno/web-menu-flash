import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule, NavController} from '@ionic/angular';
import {MenuService} from "../../services/menu.service";
import {Toast} from "../../utils/toast";
import {
  CategoryRequest,
  CategoryResponse,
  ItemMenuRequest,
  ItemMenuResponse,
  MenuResponse
} from "../../interfaces/menu.interface";
import {ActivatedRoute} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {ItemService} from "../../services/item.service";

@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.page.html',
  styleUrls: ['./menu-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MenuViewPage implements OnInit {
  isModalOpen = false;
  isModalOpen2 = false;
  modifiedItemCategoryId: number | undefined;
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
    deletedAt: null,
    listCategory: []
  };
  listItem: ItemMenuRequest[] = [];
  itemMenu: ItemMenuRequest = {
    categoryMenuId: 0,
    name: '',
    description: '',
    price: 0,
    quantity: 0
  };
  listCategory: CategoryRequest[] = [];
  category: CategoryRequest = {
    name: '',
    companyMenuId: 0
  };
  constructor(private menuService: MenuService,
              private itemService : ItemService,
              private categoryService: CategoryService,
              private toast: Toast,
              private navCtrl: NavController,
              private route: ActivatedRoute) { }

  setOpenCategory(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setOpenItem(isOpen: boolean, id: number | undefined) {
    this.isModalOpen2 = isOpen;
    if (isOpen)
      this.modifiedItemCategoryId = id;
  }

   addCategory() {
   let categoryClone: CategoryRequest = {
      name: this.category.name,
      companyMenuId: this.menuResponse.id
    }
    this.listCategory.push(categoryClone)
  }

   saveCategory() {
      this.categoryService.saveCategory(this.listCategory).subscribe({
        next: (resp: CategoryResponse[]) => {
          this.toast.present('bottom', "Cargado con éxito").then()
          resp.forEach(category => this.menuResponse.listCategory.push(category))
        },
        error: (err) => {
          console.log('error: ', err)
        }
      })
   }
   saveItems(){
    this.itemMenu.categoryMenuId = this.modifiedItemCategoryId;
     this.itemService.saveItem(this.itemMenu).subscribe({
       next: (resp: ItemMenuResponse) => {
         this.toast.present('bottom', "Cargado con éxito")
         this.listItem.push(resp)
         this.ngOnInit()
       },
       error: (err) => {
         console.log('error: ', err)
       }
     })
   }
  ngOnInit() {
    const menuId = this.route.snapshot.paramMap.get('menu-id');
    this.menuService.getMenuById(menuId).subscribe(
      {
        next: (resp: MenuResponse) => {
          console.log(resp)
          this.menuResponse = resp
          this.menuResponse.listCategory = resp.listCategory
        },
        error: (err) => {
          console.log('error: ', err)
        }
      }
    );
  }

}
