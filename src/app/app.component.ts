import { Component } from '@angular/core';
import { slideInOut } from './animations';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInOut
  ]
})
export class AppComponent {

  isDrawerOpen = false;

  videos = this.dataService.videos;

  constructor(private dataService: DataService) { }

  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }
}
