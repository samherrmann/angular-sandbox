import { Injectable, ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { DraggableComponent } from '../draggable/draggable.component';
import { DroppableComponent } from './droppable.component';

@Injectable()
export class DroppableService {

  private droppables: DroppableComponent[] = [];

  private dropTarget: DroppableComponent;

  register(droppable: DroppableComponent) {
    this.droppables.push(droppable);
  }  [x: string]: any;


  unregister(droppable: DroppableComponent) {
    this.droppables.splice(this.droppables.indexOf(droppable), 1);
  }

  drag(e: PointerEvent): void {
    this.droppables.forEach(d => {
      d.isDropTarget = this.isPointerOverDroppable(e, d);
      if (d.isDropTarget) {
        this.dropTarget = d;
      }
    });
  }

  drop(e: PointerEvent, draggable: DraggableComponent): void {
    if (this.dropTarget !== undefined) {
      // remove draggable from current host
      this.droppables.forEach(d => {
        const i = d.viewContainerRef.indexOf(draggable.componetRef.hostView);
        if (i > -1) {
          d.viewContainerRef.detach(i);
        }
      });
      // add draggable to new host
      this.dropTarget.viewContainerRef.insert(draggable.componetRef.hostView);
    }
  }

  dragEnd(e: PointerEvent): void {
    this.dropTarget = undefined;
  }

  private isPointerOverDroppable(e: PointerEvent, droppable: DroppableComponent): boolean {
    const el: HTMLElement = droppable.elementRef.nativeElement;
    return e.clientX >= el.offsetLeft && e.clientX <= (el.offsetLeft + el.offsetWidth) &&
    e.clientY >= el.offsetTop && e.clientY <= (el.offsetTop + el.offsetHeight);
  }
}
