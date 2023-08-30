import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {CreateUserRequest, CreateUserResponse, LoginUserRequest, LoginUserResponse} from "../interfaces/user.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, from, map, mergeMap, Observable, tap} from "rxjs";
import {TokenService} from "../services/token.service";

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class SecureService {

  constructor( private http: HttpClient, private tokenService: TokenService) {
  }

  postLogin(path: string, body: any | null): Observable<any> {
    return this.http.post<any>(`${URL}/${path}`, body)
  }
  //
  // async post(path: string, body: any | null): Promise<Observable<any>> {
  //   return await this.createTokenHeader().then(httpHeaders => {
  //     return this.http.post<any>(`${URL}/${path}`, body, {headers: httpHeaders})
  //   })
  // }

  get(path: string): Observable<any> {
    // const responsePromise = this.createTokenHeader().then((httpHeaders) => {
    // return this.createTokenHeader().pipe(
    //   mergeMap((header) => this.http.get<any>(`${URL}/${path}`, {headers: header})),
    // )
    let algo: string = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImNvbXBhbnlJZCI6MSwiZW1haWwiOiJwcnVlYmFFbWFpbCIsIm5hbWUiOiJjb21wYW5pYSBsb2NhIiwiY3VpdCI6IjEyMzQ1NDUzNCIsImFkZHJlc3MiOiJDYWxsZSBmYWxzYSAxMjMiLCJwaG9uZU51bWJlciI6IjExMzQ0NDU2NjQifSwiZXhwIjoxNjkzNDM2NTc5fQ.qsw3mWM9bU3az9GuXe-GGuwEtW6NxcgZTf8U-Qw50AY"
    let header = new HttpHeaders({
      'auth-token': algo
    });
    return this.http.get<any>(`${URL}/${path}`, {headers: header})
  }
  //
  // patch(path: string, body: any | null): Observable<any> {
  //   const responsePromise = this.createTokenHeader().then((httpHeaders) => {
  //     this.http.patch<any>(`${URL}/${path}`, body, {headers: httpHeaders}).subscribe((resp) => {
  //       return resp
  //     })
  //   })
  //   return from(responsePromise)
  // }
  //
  // delete(path: string): Observable<any> {
  //   const responsePromise = this.createTokenHeader().then((httpHeaders) => {
  //     this.http.delete<any>(`${URL}/${path}`, {headers: httpHeaders}).subscribe((resp) => {
  //       return resp
  //     })
  //   })
  //   return from(responsePromise)
  // }

  private createTokenHeader(): Observable<HttpHeaders> {
    const promiseHttpHeader =  this.tokenService.getToken().then((storedToken) => {
      return new HttpHeaders({
        'auth-token': storedToken ? storedToken : ''
      });
    })
    return from(promiseHttpHeader)
  }

}
