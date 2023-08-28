import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {CreateUserRequest, CreateUserResponse, LoginUserRequest, LoginUserResponse} from "../interfaces/user.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, from, map, Observable, tap} from "rxjs";
import {TokenService} from "../services/token.service";

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class SecureService {

  constructor( private http: HttpClient, private tokenService: TokenService) {
  }


  async post(path: string, body: any | null): Promise<Observable<any>> {
    return await this.createTokenHeader().then(httpHeaders => {
      return this.http.post<any>(`${URL}/${path}`, body, {headers: httpHeaders})
    })
  }

  get(path: string): Observable<any> {
    const responsePromise = this.createTokenHeader().then((httpHeaders) => {
      this.http.get<any>(`${URL}/${path}`, {headers: httpHeaders}).subscribe((resp) => {
        return resp
      })
    })
    return from(responsePromise)
  }

  patch(path: string, body: any | null): Observable<any> {
    const responsePromise = this.createTokenHeader().then((httpHeaders) => {
      this.http.patch<any>(`${URL}/${path}`, body, {headers: httpHeaders}).subscribe((resp) => {
        return resp
      })
    })
    return from(responsePromise)
  }

  delete(path: string): Observable<any> {
    const responsePromise = this.createTokenHeader().then((httpHeaders) => {
      this.http.delete<any>(`${URL}/${path}`, {headers: httpHeaders}).subscribe((resp) => {
        return resp
      })
    })
    return from(responsePromise)
  }

  private createTokenHeader(): Promise<HttpHeaders> {
    return this.tokenService.getToken().then((storedToken) => {
      return new HttpHeaders({
        'auth-token': storedToken ? storedToken : ''
      });
    })
  }

}
