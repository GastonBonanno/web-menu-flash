import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {CreateUserRequest, CreateUserResponse, LoginUserRequest, LoginUserResponse} from "../interfaces/user.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, tap} from "rxjs";
import {MenuResponse} from "../interfaces/menu.interface";

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor( private http: HttpClient) {
  }

  getMenu(): Observable<MenuResponse> {
    return this.http.get<MenuResponse>( `http://localhost:8080/company-menu/1`)
  }

}
