import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DroppableComponent } from './droppable/droppable.component';
import { DraggableComponent } from './draggable/draggable.component';
import { DragZoneDirective } from './drag-zone.directive';
import { DraggableFactoryService } from './draggable/draggable-factory.service';
import { DraggableVideoDirective } from './draggable-video.directive';
import { DragHandleDirective } from './drag-handle.directive';
import { SwipeModule } from '../swipe/swipe.module';
import { TransitContainerComponent } from './transit-container/transit-container.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { DraggableHomeButtonDirective } from './draggable-home-button.directive';

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
    TransitContainerComponent,
    DropZoneComponent,
    DraggableHomeButtonDirective
  ],
  exports: [
    DroppableComponent,
    DraggableComponent,
    DragZoneDirective,
    DraggableVideoDirective,
    DragHandleDirective,
    DraggableHomeButtonDirective
  ],
  entryComponents: [
    DraggableComponent
  ],
  providers: [
    DraggableFactoryService
  ]
})
export class DragAndDropModule { }
