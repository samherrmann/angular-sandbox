import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { DroppableComponent } from './droppable/droppable.component';
import { ExampleComponent } from './example/example.component';

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
