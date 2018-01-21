import { Injectable } from '@angular/core';
import { DroppableService } from '../droppable/droppable.service';
import { DraggableComponent } from './draggable.component';

@Injectable()
export class DraggableService {

  private dragStartPoint = {
    x: undefined,
    y: undefined
  };

  constructor(private droppableService: DroppableService) { }

  dragStart(e: PointerEvent): void {
    this.dragStartPoint.x = e.clientX;
    this.dragStartPoint.y = e.clientY;
  }

  drag(e: PointerEvent): {x: number, y: number } {
    this.droppableService.drag(e);

    return {
      x: e.clientX - this.dragStartPoint.x,
      y: e.clientY - this.dragStartPoint.y
    };
  }

  drop(e: PointerEvent, draggable: DraggableComponent): void {
    this.droppableService.drop(e, draggable);
  }

  dragEnd(e: PointerEvent): void {
    this.droppableService.dragEnd(e);
  }
}
