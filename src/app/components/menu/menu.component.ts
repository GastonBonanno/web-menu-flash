import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import {ComponentSideBar} from '../../interfaces/side-bar.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  components: Observable<ComponentSideBar[]> | undefined;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.components = this.dataService.getMenuOptions();
  }

}
