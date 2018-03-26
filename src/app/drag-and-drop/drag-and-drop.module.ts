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
import { OriginControlDirective } from './home-button.directive';
import { InTransitClassDirective } from './in-transit-class.directive';
import { TemplateOutletDirective } from './template-outlet.directive';
import { DragAndDropService } from './drag-and-drop.service';
import { RelocationService } from './relocation/relocation.service';
import { TransientRelocationService } from './relocation/transient-relocation.service';
import { TargetRelocationService } from './relocation/target-relocation.service';
import { CacheRelocationService } from './relocation/cache-relocation.service';
import { DraggableFactoryService } from './draggable/draggable-factory.service';
import { ActiveClassDirective } from './active-class.directive';

/**
 * This module provides the ability to drag and drop UI components.
 *
 * ### Features:
 * -  Support for different pointer devices, i.e. Mouse and touch screen.
 * -  True Angular re-parenting. When a draggable is moved from one droppable
 *    to another, it is not moved through direct DOM manipulation, but through
 *    the use of Angular's `ViewContainerRef`. This ensures that the draggable
 *    is attached in the correct location in Angular's change detection tree.
 *    Components may be destroyed without affecting draggables that may have
 *    resided in those components in the past.
 * -  Shadow over ghost: In most drag and drop libraries when a draggable is
 *    being dragged, a clone is created that follows the pointer, usually refered
 *    to as the "ghost". Meanwhile, the real component jumps from one drop
 *    location to another as the pointer hovers over the drop location. This
 *    approach does not work nicely for live components. If the draggable contains
 *    a video, for example, then the ghost does not show the current state of the
 *    video but the video's initial state. That may be misleading to users as it
 *    may make them believe that the video was reset when they started dragging
 *    the draggable that contains the video. With the shadow approach, the ghost
 *    is the real component that follows the pointer and the shadow is a clone
 *    that jumps from droppable to droppable. The limitation of the clone not
 *    representing the true state of the draggable is still exists with this
 *    approach. The benefit in this case though is that the ghost can be styled
 *    to a solid colour, hiding the content, without creating unexpected surprises
 *    for the users.
 * -  Ability to sort draggables within a droppable.
 * -  Ability to swap draggables between droppables.
 *
 * ### Example:
 * The following example demonstrates how to make multiple videos draggable:
 *
 * Host Component Template:
 * ```html
 * <dnd-droppable>
 *   <ng-container *ngFor="let video of videos">
 *     <ng-container *dndTemplateOutlet="draggable; context: video"></ng-container>
 *   </ng-container>
 * </dnd-droppable>
 *
 * <ng-template #draggable let-src="src">
 *   <dnd-draggable>
 *     <app-example>
 *       <video [src]="src" dndVideo></video>
 *     </app-example>
 *   </dnd-draggable>
 * </ng-template>
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
    TransitContainerComponent,
    DropZoneComponent,
    OriginControlDirective,
    InTransitClassDirective,
    TemplateOutletDirective,
    ActiveClassDirective
  ],
  exports: [
    DroppableComponent,
    DraggableComponent,
    DragZoneDirective,
    VideoDirective,
    DragHandleDirective,
    OriginControlDirective,
    InTransitClassDirective,
    TemplateOutletDirective,
    ActiveClassDirective
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
