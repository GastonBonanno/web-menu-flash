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
import {SafeUrl} from "@angular/platform-browser";


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
  listQrUrl: any[] = [];

  constructor(private menuService: MenuService, private qrService: QrService, private toast: Toast) { }

  isModalOpen = false;
  qrCodeDownloadLink: SafeUrl = ""

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
    this.qrRequest.tableName = undefined
  }
  saveQr(){
    this.qrService.saveQr(this.listMenuQrModalRequest).subscribe({
      next: () => {
        this.toast.present('bottom', "Qr creado correctamente").then()
        this.getAllQrByBranch()
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

  async deleteQr(id: number | undefined) {
    const confirm = await this.toast.alertConfirmation("¿Desea borrar el QR?")
    if (confirm) {
      this.qrService.deleteQr(id).subscribe({
        next: () => {
          this.ngOnInit()
        },
        error: (err) => {
          this.toast.present('bottom', "Error borrando el QR").then()
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

  onChangeURL(url: SafeUrl, id: number) {
    this.listQrUrl[id] = url
  }

  async downloadQrCode() {
    this.toast.present('bottom', "ToDo Envio de mail").then()
  }
}
