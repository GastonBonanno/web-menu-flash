import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComponentSideBar } from '../interfaces/side-bar.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient ) { }

  getMenuOptions() {
    let a = this.http.get<ComponentSideBar[]>('/assets/data/menu.json');
    console.log('lista del menu: ', a)
    return a
  }


}
