import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClientOrderResponse } from "../../interfaces/order.interface";
import {MenuResponse} from "../../interfaces/menu.interface";
import {OrderService} from "../../services/order.service";
import {QrResponse} from "../../interfaces/qr.interface";
import {MenuService} from "../../services/menu.service";
import {Toast} from "../../utils/toast";

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
  selectedMenu: number | undefined = undefined;
  listMenu: MenuResponse[] = [];
  isRefreshing: boolean = false

  timer = setInterval(()=> {
    this.findOrders(false)
  }, 10000);

  constructor(private orderService: OrderService, private menuService: MenuService, private toast: Toast) { }

  ngOnInit() {
    // this.findOrders();
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

  findOrders(forceCall: boolean) {
    if(this.selectedMenu && (this.isRefreshing || forceCall)) {
      this.orderService.findAllbyCompanyId(this.selectedMenu).subscribe(
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
  }

  changeState(id: number, state: string) {
    this.orderService.changeState(id, state).subscribe(
      {
        next: () => {
          this.findOrders(true)
        },
        error: (err) => { console.log('error: ', err) },
      }
    );
  }



  protected readonly console = console;

  ngOnDestroy(): void {
    clearInterval(this.timer)
  }

    protected readonly undefined = undefined;
}
