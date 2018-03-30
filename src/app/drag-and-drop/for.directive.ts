import { Directive, TemplateRef, Input, OnInit, SkipSelf } from '@angular/core';
import { DroppableComponent } from './droppable/droppable.component';
import { DraggableFactoryService } from './draggable/draggable-factory.service';

/**
 * This structural directive generates a draggable embedded view
 * for each item of the provided array. The view is inserted into
 * the parent droppable.
 *
 * Note that as of Angular 5 it is not possible to use `ngFor` due to
 * an [open issue](https://github.com/angular/angular/issues/20824). The
 * use of `ngFor` causes scenarios in which the views are inserted in
 * incorrect locations after dragging them.
 *
 * ### Example
 * ```
 * <dnd-droppable>
 *  <dnd-draggable *dndFor="let myItem of items; group 'my-collection'">
 *    <!-- content -->
 *  </dnd-draggable>
 * </dnd-droppable>
 * ```
 */
@Directive({
  selector: '[dndFor][dndForOf]'
})
export class ForDirective implements OnInit {

  /**
   * The array of items for which to generate a draggable view.
   */
  @Input()
  dndForOf: any[] = [];

  /**
   * The name to assign to the group of draggables. This
   * name is used as a prefix to generate IDs for the draggables.
   */
  @Input()
  dndForGroup = 'default';

  constructor(private templateRef: TemplateRef<any>,
    private draggableFactoryService: DraggableFactoryService,
    @SkipSelf() private droppable: DroppableComponent) {
  }

  ngOnInit() {
    this.dndForOf.forEach((item, index) => {
      // Angular view context object
      const ctx = {
        $implicit: item,
        index
      };

      this.draggableFactoryService.create(
        `${this.dndForGroup}-${index}`,
        this.templateRef,
        this.droppable,
        ctx
      );
    });
  }
}
