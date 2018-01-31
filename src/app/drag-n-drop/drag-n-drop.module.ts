import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DroppableComponent } from './droppable/droppable.component';
import { DraggableComponent } from './draggable/draggable.component';
import { DragAreaDirective } from './drag-area.directive';
import { ScrollableDirective } from './scrollable/scrollable.directive';
import { DraggableFactoryService } from './draggable/draggable-factory.service';
import { DragNDropService } from './drag-n-drop.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DroppableComponent,
    DraggableComponent,
    DragAreaDirective,
    ScrollableDirective
  ],
  exports: [
    DroppableComponent,
    DraggableComponent,
    DragAreaDirective,
    ScrollableDirective
  ],
  entryComponents: [
    DraggableComponent
  ],
  providers: [
    DraggableFactoryService,
    DragNDropService
  ]
})
export class DragNDropModule { }
