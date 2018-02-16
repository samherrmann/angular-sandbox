import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ExampleComponent } from './example/example.component';
import { DroppableComponent } from './drag-and-drop/droppable/droppable.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  isDrawerOpen = false;

  @ViewChildren(DroppableComponent)
  droppables: QueryList<DroppableComponent>;

  ngAfterViewInit() {
    this.droppables.changes.subscribe(e => {
      if (this.isDrawerOpen) {
        this.droppables.first.addDraggable(ExampleComponent);
        this.droppables.first.addDraggable(ExampleComponent);
        this.droppables.first.addDraggable(ExampleComponent);
      }
    });
  }

  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }
}
