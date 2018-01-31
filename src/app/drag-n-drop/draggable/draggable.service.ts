import { Injectable } from '@angular/core';
import { DragNDropService } from '../drag-n-drop.service';
import { Observable } from 'rxjs/Observable';
import { DragEvent, DragEventType } from '../drag-event';
import { filter, map, tap } from 'rxjs/operators';
import { DraggableComponent } from './draggable.component';
import { Coordinate2D } from '../coordinate-2d';

@Injectable()
export class DraggableService {

  private dragStartPoint: Coordinate2D;

  private draggable: DraggableComponent;

  dragStartEvents: Observable<DragEvent>;

  dragEvents: Observable<Coordinate2D>;

  dragEndEvents: Observable<DragEvent>;

  constructor(private dragAndDropService: DragNDropService) { }

  register(draggable: DraggableComponent): void {
    this.draggable = draggable;

    this.dragStartEvents = this.events(this.draggable, 'dragstart').pipe(
      tap(e => {
        this.dragStartPoint = {
          x: e.pointerEvent.clientX,
          y: e.pointerEvent.clientY
        };
      })
    );

    this.dragEvents = this.events(this.draggable, 'drag').pipe(
      map(e => {
        const delta: Coordinate2D = {
          x: e.pointerEvent.clientX - this.dragStartPoint.x,
          y: e.pointerEvent.clientY - this.dragStartPoint.y
        };
        return delta;
      })
    );

    this.dragEndEvents = this.events(this.draggable, 'dragend').pipe(
      tap(e => {
        this.dragStartPoint = null;
      })
    );
  }

  private events(draggable: DraggableComponent, type?: DragEventType): Observable<DragEvent> {
    return this.dragAndDropService.events(type).pipe(
      filter(e => e.draggable === draggable)
    );
  }
}
