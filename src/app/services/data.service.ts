import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComponentSidebar } from '../interfaces/sidebar.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient ) { }

  getSidebarOptions() {
    return this.http.get<ComponentSidebar[]>('/assets/data/sidebar.json');
  }


}
