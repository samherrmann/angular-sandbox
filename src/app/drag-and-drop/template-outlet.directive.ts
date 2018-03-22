import { Directive, OnInit, TemplateRef, Input, SkipSelf } from '@angular/core';
import { DraggableFactoryService } from './draggable/draggable-factory.service';
import { DroppableComponent } from './droppable/droppable.component';

/**
 * This structural directive adds a draggable embedded view to the parent
 * droppable from a prepared `TemplateRef`.
 *
 * ### Example
 * ```
 * <dnd-droppable>
 *   <ng-container *dndTemplateOutlet="draggable; context: myContext"></ng-container>
 * </dnd-droppable>
 *
 * <ng-template #draggable>
 *   <!-- content -->
 * </ng-template>
 * ```
 */
@Directive({
  selector: '[dndTemplateOutlet]'
})
export class TemplateOutletDirective implements OnInit {

  /**
   * The `TemplateRef` from which to create a draggable
   * embedded view.
   */
  @Input()
  dndTemplateOutlet: TemplateRef<any>;

  /**
   * The context object for the draggable embedded view.
   */
  @Input()
  dndTemplateOutletContext: any;

  /**
   * The ID to assign to the draggable.
   * If an ID is assigned to the draggable, then an embedded view is
   * only created for the draggable if the ID is not already registered.
   * This is useful in scenarios where the parent component that contains
   * this directive can be dynamically created, destroyed and recreated.
   * One example of such scenario is a drawer. A drawer component can be
   * opened and closed by the user. The first time the user opens the drawer
   * containing draggables, an embedded view is created for all those
   * draggables. If the user moves the draggable out of the drawer and then
   * closes and reopens the drawer, then the draggable that was moved out
   * of the drawer should not be created again.
   */
  @Input()
  dndTemplateOutletId = '';

  constructor(private draggableFactoryService: DraggableFactoryService,
    @SkipSelf() private droppable: DroppableComponent) {
  }

  ngOnInit() {
    this.draggableFactoryService.create<any>(
      this.dndTemplateOutletId,
      this.dndTemplateOutlet,
      this.droppable,
      this.dndTemplateOutletContext
    );
  }
}
