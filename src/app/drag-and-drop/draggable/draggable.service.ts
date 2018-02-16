import { Injectable } from '@angular/core';
import { DragAndDropService } from '../drag-and-drop.service';
import { Observable } from 'rxjs/Observable';
import { DragEvent, RemoveEvent, InsertEvent } from '../drag-event';
import { filter, map, tap } from 'rxjs/operators';
import { DraggableComponent } from './draggable.component';
import { Coordinate2D } from './coordinate-2d';

@Injectable()
export class DraggableService {

  dragStart: Observable<DragEvent>;

  drag: Observable<Coordinate2D>;

  dragEnd: Observable<DragEvent>;

  dragEnter: Observable<DragEvent>;

  dragLeave: Observable<DragEvent>;

  remove: Observable<RemoveEvent>;

  insert: Observable<InsertEvent>;

  candidate: Observable<boolean>;

  private dragStartPoint: Coordinate2D;

  constructor(private dragAndDropService: DragAndDropService) { }

  register(draggable: DraggableComponent): void {

    this.dragStart = this.dragAndDropService.dragStart.pipe(
      this.filter(draggable),
      tap(e => this.setDragStartPoint(e))
    );
    this.drag = this.dragAndDropService.drag.pipe(
      this.filter(draggable),
      map(e => this.dragPositionDelta(e))
    );
    this.dragEnter = this.dragAndDropService.dragEnter.pipe(
      this.filter(draggable)
    );
    this.dragLeave = this.dragAndDropService.dragLeave.pipe(
      this.filter(draggable)
    );
    this.dragEnd = this.dragAndDropService.dragEnd.pipe(
      this.filter(draggable),
      tap(e => this.dragStartPoint = null)
    );
    this.candidate = this.dragAndDropService.inTransit.pipe(
      map(e => e !== null && e !== draggable)
    );
    this.remove = this.dragAndDropService.remove.pipe(
      this.filter(draggable)
    );
    this.insert = this.dragAndDropService.insert.pipe(
      this.filter(draggable)
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
