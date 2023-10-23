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
import {QrRequest, QrResponse} from "../interfaces/qr.interface";

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class QrService {

  constructor(private secureService: SecureService) {
  }
  saveQr(qrRequest: QrRequest[]): Observable<void> {
    return this.secureService.post( `/qr`, qrRequest)
  }

  getAllQrByCompanyMenuId(id: number): Observable<QrResponse[]>{
    return this.secureService.get(`/qr/${id}`)
  }
}
