import { Component, ViewChildren, QueryList, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DroppableComponent } from './drag-and-drop/droppable/droppable.component';
import { TemplateDirective } from './drag-and-drop/template.directive';
import { slideInOut } from './animations';
import { DataService, Media } from './data.service';

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

  @ViewChildren(DroppableComponent)
  droppables: QueryList<DroppableComponent>;

  @ViewChild(TemplateDirective)
  draggableTpl: TemplateDirective<Media>;

  constructor(private dataService: DataService,
    private cdr: ChangeDetectorRef) { }

  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
    if (this.isDrawerOpen) {
      this.cdr.detectChanges();
      const drawer = this.droppables.find(item => item.name === 'drawer');
      this.dataService.videos.forEach((video, i) => {
        this.draggableTpl.create('example-' + i, drawer, video);
      });
    }
  }
}
