import { Injectable, TemplateRef, ViewRef } from '@angular/core';
import { DraggableComponent } from './draggable.component';
import { DroppableComponent } from '../droppable/droppable.component';
import { DragAndDropService } from '../drag-and-drop.service';
import { Subject } from 'rxjs/Subject';
import { zip } from 'rxjs/observable/zip';

/**
 * Factory to create draggables.
 *
 * This service creates the draggables through dynamic component
 * creation. To relocate components in an Angular application, a
 * reference to the `ViewRef` is required. That reference can
 * currently only be obtained by creating the components dynamically.
 */
@Injectable()
export class DraggableFactoryService {

  /**
   * Emits new {@link DraggableComponent} instances upon instantiation.
   */
  private newInstance = new Subject<DraggableComponent>();

  /**
   * Emits new draggable {@link View}s upon instantiation.
   */
  private newView = new Subject<View>();

  constructor(private dragAndDropService: DragAndDropService) {

    // The RxJx `zip` operator will only emit an event once
    // both inner observables have emitted an event. This
    // allows us to pair new view instances with new draggable
    // component instances, and pass the view information to
    // the draggable component.
    zip(this.newView, this.newInstance).subscribe(e => {
      const view = e[0];
      const instance = e[1];

      instance.onFactoryInit(
        view.id,
        view.viewRef,
        view.droppable);
    });
  }

  /**
   * Create a draggable view.
   * @param id The ID to assign to the draggable.
   * @param tpl The template from which to create the draggable view.
   * @param droppable The droppable to which to insert the draggable.
   * @param ctx The view context object.
   */
  create<T>(id: string, tpl: TemplateRef<T>, droppable: DroppableComponent, ctx?: T): void {
    if (!this.dragAndDropService.draggables.has(id)) {
      const viewRef = droppable.viewContainerRef.createEmbeddedView(tpl, ctx);

      this.newView.next({
        id: id,
        viewRef: viewRef,
        droppable: droppable
      });
    }
  }

  /**
   * Register a new draggable instance.
   *
   * This method is designed to be called by the draggable
   * upon instantiation. The draggable requires view information
   * to do its job, which can only be provided by this factory
   * service. When a draggable calls this register method, the
   * factory will then call a `onFactoryInit` method on the
   * draggable with the view information.
   *
   * @param draggable The draggable instance to register.
   */
  register(draggable: DraggableComponent): void {
    this.newInstance.next(draggable);
  }
}

interface View {
  id: string;
  viewRef: ViewRef;
  droppable: DroppableComponent;
}
