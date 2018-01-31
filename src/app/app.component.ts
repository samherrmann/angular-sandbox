import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ExampleComponent } from './example/example.component';
import { DroppableComponent } from './drag-n-drop/droppable/droppable.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChildren(DroppableComponent)
  droppables: QueryList<DroppableComponent>;

  ngAfterViewInit() {
    this.droppables.first.addDraggable(ExampleComponent);
  }
}
