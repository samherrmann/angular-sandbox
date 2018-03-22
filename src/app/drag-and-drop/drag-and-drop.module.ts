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
import { TemplateOutletDirective } from './template-outlet.directive';
import { DragAndDropService } from './drag-and-drop.service';
import { RelocationService } from './relocation/relocation.service';
import { TransientRelocationService } from './relocation/transient-relocation.service';
import { TargetRelocationService } from './relocation/target-relocation.service';
import { CacheRelocationService } from './relocation/cache-relocation.service';
import { DraggableFactoryService } from './draggable/draggable-factory.service';

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
    TemplateOutletDirective
  ],
  exports: [
    DroppableComponent,
    DraggableComponent,
    DragZoneDirective,
    VideoDirective,
    DragHandleDirective,
    HomeButtonDirective,
    InTransitClassDirective,
    TemplateOutletDirective
  ],
  entryComponents: [
    DraggableComponent
  ],
  providers: [
    DragAndDropService,
    RelocationService,
    TransientRelocationService,
    TargetRelocationService,
    CacheRelocationService,
    DraggableFactoryService
  ]
})
export class DragAndDropModule { }
