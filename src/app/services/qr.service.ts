import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Observable} from "rxjs";
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
  deleteQr(id: number | undefined): Observable<void> {
    return this.secureService.delete( `/qr/${id}`)
  }

}
