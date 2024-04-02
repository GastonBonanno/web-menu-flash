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
import {Validations} from "../../utils/validations";
import {FieldValidation} from "../../interfaces/validations.interface";
import {QRCodeModule} from "angularx-qrcode";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, QRCodeModule]
})
export class MenuPage implements OnInit {

  branchError: FieldValidation = {
    size: 60,
    error: null
  }

  headerError: FieldValidation = {
    size: 60,
    error: null
  }

  titleError: FieldValidation = {
    size: 60,
    error: null
  }

  descriptionError: FieldValidation = {
    size: 60,
    error: null
  }

  footerError: FieldValidation = {
    size: 60,
    error: null
  }

  menu: MenuRequest = {
    branch: '',
    title: '',
    description: '',
    header: '',
    footer: ''
  };

  menuResponse: MenuResponse = {
    id: 0,
    branch: '',
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

  listMenu: MenuResponse[] = [];
  isModalOpen = false;
  validations: Validations

  constructor(private menuService: MenuService,  private toast: Toast, private navCtrl: NavController, route: ActivatedRoute, validations: Validations) {
    this.validations = validations
  }

  saveMenu() {
    if(this.validateErrors()) {
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
  }

  editMenu(menuId: number) {
    this.navCtrl.navigateRoot(['/menu-view', menuId], {animated: true})
    return menuId
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async deleteMenu(id: number): Promise<void> {
    const confirm = await this.toast.alertConfirmation("¿Desea borrar el menu?")
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

  clearItem() {
    this.menu = {
      branch: '',
      description: '',
      header: '',
      title: '',
      footer: ''
    }
    this.clearErrors()
  }


  clearErrors() {
    this.branchError.error = null
    this.titleError.error = null
    this.footerError.error = null
    this.descriptionError.error = null
    this.headerError.error = null
  }


  validateErrors(): boolean {
    return this.branchError.error === null
      && this.headerError.error === null
      && this.titleError.error === null
      && this.descriptionError.error === null
      && this.footerError.error === null
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
}
