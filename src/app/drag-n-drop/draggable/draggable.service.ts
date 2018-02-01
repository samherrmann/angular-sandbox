import { Injectable } from '@angular/core';
import { DragNDropService } from '../drag-n-drop.service';
import { Observable } from 'rxjs/Observable';
import { DragEvent } from '../drag-event';
import { filter, map, tap } from 'rxjs/operators';
import { DraggableComponent } from './draggable.component';
import { Coordinate2D } from '../coordinate-2d';

@Injectable()
export class DraggableService {

  dragStartEvents: Observable<DragEvent>;

  dragEvents: Observable<Coordinate2D>;

  dragEndEvents: Observable<DragEvent>;

  dragEnterEvents: Observable<DragEvent>;

  dragLeaveEvents: Observable<DragEvent>;

  private dragStartPoint: Coordinate2D;

  constructor(private dragAndDropService: DragNDropService) { }

  register(draggable: DraggableComponent): void {

    this.dragStartEvents = this.dragAndDropService.dragStart.pipe(
      this.filter(draggable),
      tap(e => this.setDragStartPoint(e))
    );
    this.dragEvents = this.dragAndDropService.drag.pipe(
      this.filter(draggable),
      map(e => this.dragPositionDelta(e))
    );
    this.dragEnterEvents = this.dragAndDropService.dragEnter.pipe(
      this.filter(draggable)
    );
    this.dragLeaveEvents = this.dragAndDropService.dragLeave.pipe(
      this.filter(draggable)
    );
    this.dragEndEvents = this.dragAndDropService.dragEnd.pipe(
      this.filter(draggable),
      tap(e => this.dragStartPoint = null)
    );
  }

  private filter(draggable: DraggableComponent) {
    return filter<DragEvent>(e => e.draggable === draggable);
  }

  private setDragStartPoint(e: DragEvent): void {
    this.dragStartPoint = {
      x: e.pointerEvent.clientX,
      y: e.pointerEvent.clientY
    };
  }

  private dragPositionDelta(e: DragEvent): Coordinate2D {
    const delta: Coordinate2D = {
      x: e.pointerEvent.clientX - this.dragStartPoint.x,
      y: e.pointerEvent.clientY - this.dragStartPoint.y
    };
    return delta;
  }
}
