import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {QRCodeModule} from "angularx-qrcode";

@Component({
  selector: 'app-qr-tables',
  templateUrl: './qr-tables.page.html',
  styleUrls: ['./qr-tables.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, QRCodeModule]
})
export class QrTablesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
