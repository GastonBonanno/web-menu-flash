import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import {ComponentSidebar} from '../../interfaces/sidebar.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  itemSrc: string = '/assets/iconoMF.png';

  components: Observable<ComponentSidebar[]> | undefined;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.components = this.dataService.getSidebarOptions();
  }

}
