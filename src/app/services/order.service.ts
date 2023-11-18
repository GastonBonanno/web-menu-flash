import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Observable} from "rxjs";
import {SecureService} from "../utils/secure.service";
import {ClientOrderResponse} from "../interfaces/order.interface";

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private secureService: SecureService) {
  }
  findAllbyCompanyId(): Observable<ClientOrderResponse[]> {
    return this.secureService.get( `/order`)
  }

}
