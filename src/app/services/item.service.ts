import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {CreateUserRequest, CreateUserResponse, LoginUserRequest, LoginUserResponse} from "../interfaces/user.interface";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, tap} from "rxjs";
import {
  CategoryRequest,
  CategoryResponse,
  ItemMenuRequest, ItemMenuResponse,
  MenuRequest,
  MenuResponse
} from "../interfaces/menu.interface";
import {SecureService} from "../utils/secure.service";

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private secureService: SecureService) {
  }
  saveItem(itemMenu: ItemMenuRequest): Observable<ItemMenuResponse> {
    return this.secureService.post( `/item-menu`, itemMenu)
  }

  deleteItem(id: number): Observable<void>{
    return this.secureService.delete(`/item-menu/${id}`)
  }

  editItem(item: ItemMenuResponse): Observable<void>{
    return this.secureService.patch(`/item-menu`, item)
  }

}
