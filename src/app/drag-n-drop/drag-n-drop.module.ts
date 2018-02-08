import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DroppableComponent } from './droppable/droppable.component';
import { DraggableComponent } from './draggable/draggable.component';
import { DragAreaDirective } from './drag-area.directive';
import { DraggableFactoryService } from './draggable/draggable-factory.service';
import { DragNDropService } from './drag-n-drop.service';
import { DraggableVideoDirective } from './draggable-video.directive';
import { DragHandleDirective } from './drag-handle.directive';
import { ScrollableComponent } from './scrollable/scrollable.component';
import { SwipeModule } from '../swipe/swipe.module';
import { ScrollableDirective } from './scrollable/scrollable.directive';

@NgModule({
  imports: [
    CommonModule,
    SwipeModule
  ],
  declarations: [
    DroppableComponent,
    DraggableComponent,
    DragAreaDirective,
    DraggableVideoDirective,
    DragHandleDirective,
    ScrollableComponent,
    ScrollableDirective
  ],
  exports: [
    DroppableComponent,
    DraggableComponent,
    DragAreaDirective,
    DraggableVideoDirective,
    DragHandleDirective,
    ScrollableComponent
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
