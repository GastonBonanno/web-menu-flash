import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {CreateUserRequest, CreateUserResponse, LoginUserRequest, LoginUserResponse} from "../interfaces/user.interface";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, tap} from "rxjs";
import {MenuRequest, MenuResponse} from "../interfaces/menu.interface";
import {SecureService} from "../utils/secure.service";

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private secureService: SecureService) {
  }

  getMenuList(): Observable<MenuResponse[]> {
    // let params = new HttpParams()
    //   .set('companyId', companyId);
    // return this.http.get<MenuResponse>( `${URL}/company-menu/`, {params: params})
    // return this.http.get<MenuResponse[]>( `${URL}/company-menu/`)
    return this.secureService.get('/company-menu');
  }

  getMenuById(menuId: string | null): Observable<MenuResponse> {
    return this.secureService.get('/company-menu/' + menuId);
  }

  saveMenu(menu: MenuRequest): Observable<MenuResponse> {
    return this.secureService.post( `/company-menu`, menu)
  }

  deleteMenu(id: number): Observable<void> {
    return this.secureService.delete( `/company-menu/${id}`)
  }
}
