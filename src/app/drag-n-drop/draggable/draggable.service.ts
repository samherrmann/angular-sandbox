import { Injectable } from '@angular/core';
import { DragNDropService } from '../drag-n-drop.service';
import { Observable } from 'rxjs/Observable';
import { DragEvent, DragEventType } from '../drag-event';
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

  private draggable: DraggableComponent;

  constructor(private dragAndDropService: DragNDropService) { }

  register(draggable: DraggableComponent): void {
    this.draggable = draggable;

    this.dragStartEvents = this.events('dragstart').pipe(
      tap(e => this.setDragStartPoint(e))
    );
    this.dragEvents = this.events('drag').pipe(
      map(e => this.dragPositionDelta(e))
    );
    this.dragEnterEvents = this.events('dragenter');
    this.dragLeaveEvents = this.events('dragleave');
    this.dragEndEvents = this.events('dragend').pipe(
      tap(e => this.dragStartPoint = null)
    );
  }

  private events(type: DragEventType): Observable<DragEvent> {
    return this.dragAndDropService.events(type).pipe(
      filter(e => e.draggable === this.draggable)
    );
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
