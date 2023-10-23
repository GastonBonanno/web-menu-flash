import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {QRCodeModule} from "angularx-qrcode";
import {CategoryRequest, MenuResponse} from "../../interfaces/menu.interface";
import {MenuService} from "../../services/menu.service";
import {Toast} from "../../utils/toast";
import {QrRequest, QrResponse} from "../../interfaces/qr.interface";
import {QrService} from "../../services/qr.service";

@Component({
  selector: 'app-qr-tables',
  templateUrl: './qr-tables.page.html',
  styleUrls: ['./qr-tables.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, QRCodeModule]
})
export class QrTablesPage implements OnInit {

  selectedMenu: number | undefined = undefined;
  listMenuQrModalRequest: QrRequest[] = [];
  listMenu: MenuResponse[] = [];
  listAllQr: QrResponse[] = [];

  constructor(private menuService: MenuService, private qrService: QrService, private toast: Toast) { }

  isModalOpen = false;

  qrRequest: QrRequest = {
    tableName: undefined,
    companyMenuId: undefined
  }

  setOpenQrModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  addMenuQr() {
    let menuQrClone: QrRequest = {
      tableName: this.qrRequest.tableName,
      companyMenuId: this.selectedMenu,
    }
    this.listMenuQrModalRequest.push(menuQrClone)
  }
  saveQr(){
    //this.qrRequest.companyMenuId = this.selectedMenu;
    this.qrService.saveQr(this.listMenuQrModalRequest).subscribe({
      next: () => {
        this.toast.present('bottom', "Qr creado correctamente").then()
      },
      error: (err) => {
        this.toast.present('bottom', "Error al cargar la lista de menú").then()
        console.log('error: ', err)
      }
    })
  }

  clearInputs(){
    this.listMenuQrModalRequest = []
    this.qrRequest.tableName = undefined
    this.qrRequest.companyMenuId = undefined
  }

  getAllQrByBranch(){
    if (this.selectedMenu){
      this.qrService.getAllQrByCompanyMenuId(this.selectedMenu).subscribe({
        next: (resp: QrResponse[]) => {
          this.listAllQr = resp
        },
        error: (err) => {
          this.toast.present('bottom', "Error al cargar la lista de menú").then()
          console.log('error: ', err)
        }
      })
    }
  }
  ngOnInit() {
    if (this.selectedMenu){
      this.qrService.getAllQrByCompanyMenuId(this.selectedMenu).subscribe({
        next: (resp: QrResponse[]) => {
          this.listAllQr = resp
        },
        error: (err) => {
          this.toast.present('bottom', "Error al cargar la lista de menú").then()
          console.log('error: ', err)
        }
      })
    }
    this.menuService.getMenuList().subscribe({
      next: (resp: MenuResponse[]) => {
        this.listMenu = resp
      },
      error: (err) => {
        this.toast.present('bottom', "Error al cargar la lista de menú").then()
        console.log('error: ', err)
      }
    }
    )
  }

  protected readonly undefined = undefined;
}
