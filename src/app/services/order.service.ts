import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Observable} from "rxjs";
import {SecureService} from "../utils/secure.service";
import {ClientOrderResponse} from "../interfaces/order.interface";
import {HttpParams} from "@angular/common/http";

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

  changeState(id: number, state: string): Observable<void> {
    let params: HttpParams = new HttpParams({ fromObject: { state: state } });
    return this.secureService.put(`/order/${id}`, params)
  }

}
