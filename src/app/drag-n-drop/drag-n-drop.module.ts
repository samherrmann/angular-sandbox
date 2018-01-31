import { NgModule } from '@angular/core';
import { DroppableComponent } from './droppable/droppable.component';
import { DraggableComponent } from './draggable/draggable.component';
import { DragAreaDirective } from './drag-area.directive';
import { ScrollableDirective } from './scrollable/scrollable.directive';
import { DraggableFactoryService } from './draggable/draggable-factory.service';
import { DragNDropService } from './drag-n-drop.service';
import { DraggableVideoDirective } from './draggable-video.directive';
import { DragHandleDirective } from './drag-handle.directive';

@NgModule({
  declarations: [
    DroppableComponent,
    DraggableComponent,
    DragAreaDirective,
    ScrollableDirective,
    DraggableVideoDirective,
    DragHandleDirective
  ],
  exports: [
    DroppableComponent,
    DraggableComponent,
    DragAreaDirective,
    ScrollableDirective,
    DraggableVideoDirective,
    DragHandleDirective
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
