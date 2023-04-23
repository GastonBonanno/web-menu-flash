import { Component, OnInit } from '@angular/core';
// import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { ComponentMenu } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  components: Observable<ComponentMenu[]> | undefined;

  // constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.components = this.dataService.getMenuOptions();
  }

}
