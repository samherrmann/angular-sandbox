import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DroppableComponent } from './droppable/droppable.component';
import { DraggableComponent } from './draggable/draggable.component';
import { DragZoneDirective } from './drag-zone.directive';
import { VideoDirective } from './video.directive';
import { DragHandleDirective } from './drag-handle.directive';
import { SwipeModule } from '../swipe/swipe.module';
import { GhostComponent } from './ghost/ghost.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { OriginControlDirective } from './origin-control.directive';
import { InTransitClassDirective } from './in-transit-class.directive';
import { DragAndDropService } from './drag-and-drop.service';
import { RelocationService } from './relocation/relocation.service';
import { TransientRelocationService } from './relocation/transient-relocation.service';
import { TargetRelocationService } from './relocation/target-relocation.service';
import { CacheRelocationService } from './relocation/cache-relocation.service';
import { DraggableFactoryService } from './draggable/draggable-factory.service';
import { ActiveClassDirective } from './active-class.directive';
import { ForDirective } from './for.directive';

/**
 * This module provides the ability to drag and drop UI components.
 *
 * ### Features:
 * -  Support for different pointer devices, i.e. Mouse and touch screen.
 * -  True Angular re-parenting. When a draggable is moved from one droppable to
 *    another, it is not moved through direct DOM manipulation, but through the
 *    use of Angular's `ViewContainerRef`. This ensures that the draggable is
 *    attached in the correct location in Angular's change detection tree.
 *    Components may be destroyed without affecting draggables that may have
 *    resided in those components in the past.
 * -  Live draggable components, such as videos, follow the pointer as they are
 *    being dragged without affecting their state.
 * -  Ability to sort draggables within a droppable.
 * -  Ability to swap draggables between droppables.
 *
 * ### Example:
 * The following example demonstrates how to make multiple videos draggable:
 *
 * Host Component Template:
 * ```html
 * <dnd-droppable>
 *   <dnd-draggable *dndFor="let video of videos; group 'video'">
 *     <app-example>
 *       <video [src]="video.src" dndVideo></video>
 *     </app-example>
 *   </dnd-draggable>
 * </dnd-droppable>
 * ```
 *
 * Host Component Class:
 * ```ts
 *  export class MyHostComponent implements OnInit {
 *
 *    videos = [{
 *      src: '/path/to/video-1.mp4'
 *    }, {
 *      src: '/path/to/video-2.mp4'
 *    }, {
 *      src: '/path/to/video-3.mp4'
 *    }]
 *  }
 */
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
    GhostComponent,
    DropZoneComponent,
    OriginControlDirective,
    InTransitClassDirective,
    ActiveClassDirective,
    ForDirective
  ],
  exports: [
    DroppableComponent,
    DraggableComponent,
    DragZoneDirective,
    VideoDirective,
    DragHandleDirective,
    OriginControlDirective,
    InTransitClassDirective,
    ActiveClassDirective,
    ForDirective
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
