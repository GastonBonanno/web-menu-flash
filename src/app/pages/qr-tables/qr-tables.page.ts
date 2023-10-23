import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {QRCodeModule} from "angularx-qrcode";
import {MenuResponse} from "../../interfaces/menu.interface";
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
  listMenu: MenuResponse[] = [];

  constructor(private menuService: MenuService, private qrService: QrService, private toast: Toast) { }

  isModalOpen = false;

  qrRequest: QrRequest = {
    tableName: undefined,
    companyMenuId: undefined
  }

  setOpenQrModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  saveQr(){
    this.qrRequest.companyMenuId = this.selectedMenu;
    this.qrService.saveQr(this.qrRequest).subscribe({
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
    this.qrRequest.tableName = undefined
    this.qrRequest.companyMenuId = undefined
  }

  ngOnInit() {
    this.menuService.getMenuList().subscribe({
      next: (resp: MenuResponse[]) => {
        this.listMenu = resp
      },
      error: (err) => {
        this.toast.present('bottom', "Error al cargar la lista de menú").then()
        console.log('error: ', err)
      }
    })
  }

}
