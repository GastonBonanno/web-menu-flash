import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule, NavController} from '@ionic/angular';
import {MenuService} from "../../services/menu.service";
import {Toast} from "../../utils/toast";
import {CategoryRequest, MenuResponse} from "../../interfaces/menu.interface";
import {ActivatedRoute} from "@angular/router";

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
    deletedAt: null
  };
  listCategory: CategoryRequest[] = [];
  category: CategoryRequest = {
    name: '',
    menuId: 0
  };
  constructor(private menuService: MenuService,  private toast: Toast, private navCtrl: NavController, private route: ActivatedRoute) { }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setOpen2(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


   addCategory() {
   let categoryClone: CategoryRequest = {
      name: this.category.name,
      menuId: this.category.menuId
    }
    this.listCategory.push(categoryClone)
  }

   saveCategory() {
      // this.menuService.saveCategory(this.listCategory).subscribe({
      //   next: (resp: MenuResponse) => {
      //     this.toast.present('bottom', "Cargado con éxito").then()
      //     this.menuResponse = resp
      //   },
      //   error: (err) => {
      //     console.log('error: ', err)
      //   }
      // })
   }
  ngOnInit() {
    const menuId = this.route.snapshot.paramMap.get('menu-id');
    this.menuService.getMenuById(menuId).subscribe(
      {
        next: (resp: MenuResponse) => {
          console.log(resp)
          this.menuResponse = resp
        },
        error: (err) => {
          console.log('error: ', err)
        }
      }
    );
  }

}
