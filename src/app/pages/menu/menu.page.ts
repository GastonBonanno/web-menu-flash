import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, NavController} from '@ionic/angular';
import {CategoryRequest, ItemMenuRequest, MenuRequest, MenuResponse} from "../../interfaces/menu.interface";
import {Toast} from "../../utils/toast";
import {MenuService} from "../../services/menu.service";
import {LoginUserResponse} from "../../interfaces/user.interface";
import {menu} from "ionicons/icons";
import {tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";

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
    deletedAt: null,
    listCategory: []
  };

  category: CategoryRequest = {
    name: '',
    position: undefined,
    companyMenuId: 0
  };

  itemMenu: ItemMenuRequest = {
    categoryMenuId: 0,
    name: '',
    position: undefined,
    description: '',
    price: 0,
    quantity: 0
  };



  listCategory: CategoryRequest[] = [];
  listItem: ItemMenuRequest[] = [];
  listMenu: MenuResponse[] = [];
  isModalOpen = false;
  isModalOpen2 = false;
  isModalOpen3 = false;

  constructor(private menuService: MenuService,  private toast: Toast, private navCtrl: NavController, route: ActivatedRoute) {
    // console.log('constructorrrr: ')
    // route.params.subscribe(val => {
    //   console.log('route: ', route)
    // });
  }

  saveMenu() {
    this.menuService.saveMenu(this.menu).subscribe({
      next: (resp: MenuResponse) => {
        this.navCtrl.navigateRoot(['/menu-view', resp.id], {animated: true})
        return resp
      },
      error: (err) => {
        this.toast.present('bottom', "Error menu").then()
        console.log('error: ', err)
      }
    })
  }

  editMenu(menuId: number) {
    this.navCtrl.navigateRoot(['/menu-view', menuId], {animated: true})
    return menuId
  }

  addCategory() {
    let categoryClone: CategoryRequest = {
      name: this.category.name,
      position: this.category.position,
      companyMenuId: this.menuResponse.id
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
      position: this.itemMenu.position,
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
    this.menuService.getMenuList().subscribe({
      next: (resp: MenuResponse[]) => {
        console.log('resp: ', resp)
        this.listMenu = resp
      },
      error: (err) => {
        this.toast.present('bottom', "Error al cargar la lista de menú").then()
        console.log('error: ', err)
      }
    })
  }

  async deleteMenu(id: number): Promise<void> {
    const confirm = await this.toast.alertConfirmation("Estas seguro que queres borrar el menu")
    if (confirm) {
      this.menuService.deleteMenu(id).subscribe({
        next: () => {
          // window.location.reload()
          this.ngOnInit()
        },
        error: (err) => {
          this.toast.present('bottom', "Error borrando el menu").then()
          console.log('error: ', err)
        }
      })
    }
  }
}
