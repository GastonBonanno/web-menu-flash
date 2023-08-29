import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';
import {ComponentSidebar} from '../../interfaces/sidebar.interface';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  itemSrc: string = '/assets/logoMenu-Flash.png';
  redirectHome: string = '/home';

  components: Observable<ComponentSidebar[]> | undefined;

  constructor(private dataService: DataService, private navCtrl: NavController) { }



  ngOnInit() {
    this.components = this.dataService.getSidebarOptions();
  }

}
