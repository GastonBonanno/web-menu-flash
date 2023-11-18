import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClientOrderResponse } from "../../interfaces/order.interface";
import {MenuResponse} from "../../interfaces/menu.interface";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OrdersPage implements OnInit {

  pendingClientOrderResponse: ClientOrderResponse[] = []
  finishedClientOrderResponse: ClientOrderResponse[] = []
  pendingOrdersId: string[] = []

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.findAllbyCompanyId().subscribe(
      {
        next: (resp: ClientOrderResponse[]) => {
          // console.log(resp)
          this.pendingClientOrderResponse = resp.filter((order) => 'PENDIENTE' === order.state.name)
          this.pendingOrdersId = this.pendingClientOrderResponse.map((order) => order.id.toString())
          this.finishedClientOrderResponse = resp.filter((order) => 'PENDIENTE' !== order.state.name)
        },
        error: (err) => {
          console.log('error: ', err)
        }
      }
    );
  }

  protected readonly console = console;
}
