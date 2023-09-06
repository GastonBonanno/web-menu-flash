import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule, NavController} from '@ionic/angular';
import {MenuService} from "../../services/menu.service";
import {Toast} from "../../utils/toast";
import {CategoryRequest, CategoryResponse, MenuResponse} from "../../interfaces/menu.interface";
import {ActivatedRoute} from "@angular/router";
import {CategoryService} from "../../services/category.service";

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
  listCategory: CategoryRequest[] = [];
  category: CategoryRequest = {
    name: '',
    companyMenuId: 0
  };
  constructor(private menuService: MenuService, private categoryService: CategoryService,  private toast: Toast, private navCtrl: NavController, private route: ActivatedRoute) { }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setOpen2(isOpen: boolean) {
    this.isModalOpen = isOpen;
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
