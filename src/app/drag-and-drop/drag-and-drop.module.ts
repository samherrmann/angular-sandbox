import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DroppableComponent } from './droppable/droppable.component';
import { DraggableComponent } from './draggable/draggable.component';
import { DragZoneDirective } from './drag-zone.directive';
import { VideoDirective } from './video.directive';
import { DragHandleDirective } from './drag-handle.directive';
import { SwipeModule } from '../swipe/swipe.module';
import { TransitContainerComponent } from './transit-container/transit-container.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { HomeButtonDirective } from './home-button.directive';
import { InTransitClassDirective } from './in-transit-class.directive';
import { ContentDirective } from './content.directive';
import { TemplateDirective } from './template.directive';

@NgModule({
  imports: [
    CommonModule,
    SwipeModule
  ],
  declarations: [
    DroppableComponent,
    DraggableComponent,
    DragZoneDirective,
    VideoDirective,
    DragHandleDirective,
    TransitContainerComponent,
    DropZoneComponent,
    HomeButtonDirective,
    InTransitClassDirective,
    ContentDirective,
    TemplateDirective
  ],
  exports: [
    DroppableComponent,
    DraggableComponent,
    DragZoneDirective,
    VideoDirective,
    DragHandleDirective,
    HomeButtonDirective,
    InTransitClassDirective,
    ContentDirective,
    TemplateDirective
  ],
  entryComponents: [
    DraggableComponent
  ]
})
export class DragAndDropModule { }
