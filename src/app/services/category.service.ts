import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {CreateUserRequest, CreateUserResponse, LoginUserRequest, LoginUserResponse} from "../interfaces/user.interface";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, tap} from "rxjs";
import {CategoryRequest, CategoryResponse, MenuRequest, MenuResponse} from "../interfaces/menu.interface";
import {SecureService} from "../utils/secure.service";

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http: HttpClient, private secureService: SecureService) {
  }

  // getCategoryList(): Observable<MenuResponse[]> {
  //   return this.secureService.get('/company-menu');
  // }
  //
  // getMenuById(menuId: string | null): Observable<MenuResponse> {
  //   return this.secureService.get('/company-menu/' + menuId);
  // }

  saveCategory(listCategory: CategoryRequest[]): Observable<CategoryResponse[]> {
    return this.secureService.post( `/category-menu`, listCategory)
  }


}