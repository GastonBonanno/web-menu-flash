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

  constructor( private http: HttpClient, private secureService: SecureService) {
  }

  getMenuList(): Observable<MenuResponse[]> {
    // let params = new HttpParams()
    //   .set('companyId', companyId);
    // return this.http.get<MenuResponse>( `${URL}/company-menu/`, {params: params})
    // return this.http.get<MenuResponse>( `${URL}/company-menu/`)
    return this.secureService.get('company-menu');
  }

  saveMenu(menu: MenuRequest): Observable<MenuResponse> {
    return this.http.post<MenuResponse>( `${URL}/company-menu`, menu)
  }

}
