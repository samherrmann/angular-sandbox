import { Injectable } from '@angular/core';
import { DragAndDropService } from '../drag-and-drop.service';
import { Observable } from 'rxjs/Observable';
import { DragEvent, RemoveEvent, InsertEvent } from '../drag-event';
import { filter, map, tap } from 'rxjs/operators';
import { DraggableComponent } from './draggable.component';
import { Coordinate2D } from './coordinate-2d';
import { UnaryFunction } from 'rxjs/interfaces';

@Injectable()
export class DraggableService {

  inTransit: Observable<boolean>;

  dragStart: Observable<DragEvent>;

  drag: Observable<Coordinate2D>;

  dragEnd: Observable<DragEvent>;

  remove: Observable<RemoveEvent>;

  insert: Observable<InsertEvent>;

  target: Observable<boolean>;

  private dragStartPoint: Coordinate2D;

  constructor(private dragAndDropService: DragAndDropService) { }

  register(draggable: DraggableComponent): void {

    this.inTransit = this.dragAndDropService.inTransit.pipe(
      map(e => e === draggable)
    );
    this.dragStart = this.dragAndDropService.dragStart.pipe(
      this.filterInstance(draggable),
      tap(e => this.setDragStartPoint(e))
    );
    this.drag = this.dragAndDropService.drag.pipe(
      this.filterInstance(draggable),
      map(e => this.dragPositionDelta(e))
    );
    this.dragEnd = this.dragAndDropService.dragEnd.pipe(
      this.filterInstance(draggable),
      tap(e => this.dragStartPoint = null)
    );
    this.target = this.dragAndDropService.inTransit.pipe(
      map(e => e !== null && e !== draggable)
    );
    this.remove = this.dragAndDropService.remove.pipe(
      this.filterInstance(draggable)
    );
    this.insert = this.dragAndDropService.insert.pipe(
      this.filterInstance(draggable)
    );
  }

  private filterInstance(draggable: DraggableComponent): UnaryFunction<Observable<DragEvent>, Observable<DragEvent>> {
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
