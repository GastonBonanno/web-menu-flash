import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class OrdersPage implements OnInit, OnDestroy {

  pendingClientOrderResponse: ClientOrderResponse[] = []
  finishedClientOrderResponse: ClientOrderResponse[] = []
  pendingOrdersId: string[] = []

  timer = setInterval(()=> {
    this.findOrders()
  }, 10000);

  //ToDo Poner un flag para que no refresque los pedidos

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.findOrders();
  }

  private findOrders() {
    this.orderService.findAllbyCompanyId().subscribe(
      {
        next: (resp: ClientOrderResponse[]) => {
          this.pendingClientOrderResponse = resp.filter((order) => 'PENDIENTE' === order.state.name)
          this.finishedClientOrderResponse = resp.filter((order) => 'PENDIENTE' !== order.state.name)
          this.pendingOrdersId = this.pendingClientOrderResponse.map((order) => order.id.toString())
        },
        error: (err) => {
          console.log('error: ', err)
        },
      }
    );
  }

  changeState(id: number, state: string) {
    this.orderService.changeState(id, state).subscribe(
      {
        next: () => {
          this.ngOnInit()
        },
        error: (err) => { console.log('error: ', err) },
      }
    );
  }

  protected readonly console = console;

  ngOnDestroy(): void {
    clearInterval(this.timer)
  }
}
