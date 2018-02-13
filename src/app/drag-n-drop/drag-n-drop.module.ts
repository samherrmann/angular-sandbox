import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DroppableComponent } from './droppable/droppable.component';
import { DraggableComponent } from './draggable/draggable.component';
import { DragZoneDirective } from './drag-zone.directive';
import { DraggableFactoryService } from './draggable/draggable-factory.service';
import { DragNDropService } from './drag-n-drop.service';
import { DraggableVideoDirective } from './draggable-video.directive';
import { DragHandleDirective } from './drag-handle.directive';
import { ScrollableComponent } from './scrollable/scrollable.component';
import { SwipeModule } from '../swipe/swipe.module';
import { TransitContainerComponent } from './transit-container/transit-container.component';

@NgModule({
  imports: [
    CommonModule,
    SwipeModule
  ],
  declarations: [
    DroppableComponent,
    DraggableComponent,
    DragZoneDirective,
    DraggableVideoDirective,
    DragHandleDirective,
    ScrollableComponent,
    TransitContainerComponent
  ],
  exports: [
    DroppableComponent,
    DraggableComponent,
    DragZoneDirective,
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
