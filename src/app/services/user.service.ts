import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {CreateUserRequest, CreateUserResponse, LoginUserRequest, LoginUserResponse} from "../interfaces/user.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, tap} from "rxjs";

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) {
  }


  login(loginUser: LoginUserRequest): Observable<LoginUserResponse> {
    // return this.http.post<LoginUserResponse>( `${URL}/login`, loginUser)
    return this.http.post<LoginUserResponse>( `https://menuflash.free.beeceptor.com/login`, loginUser)
  }

  createUser(loginUser: CreateUserRequest): Observable<CreateUserResponse> {
    // return this.http.post<LoginUserResponse>( `${URL}/login`, loginUser)
    return this.http.post<CreateUserResponse>( `https://menuflash.free.beeceptor.com/create-account`, loginUser)
  }

}
