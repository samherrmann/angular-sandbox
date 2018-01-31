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

  constructor(private dragAndDropService: DragNDropService) { }

  dragStartEvents(draggable: DraggableComponent): Observable<DragEvent> {
    return this.events(draggable, 'dragstart').pipe(
      tap(e => {
        this.dragStartPoint = {
          x: e.pointerEvent.clientX,
          y: e.pointerEvent.clientY
        };
      })
    );
  }

  dragEvents(draggable: DraggableComponent): Observable<Coordinate2D> {
    return this.events(draggable, 'drag').pipe(
      map(e => {
        const delta: Coordinate2D = {
          x: e.pointerEvent.clientX - this.dragStartPoint.x,
          y: e.pointerEvent.clientY - this.dragStartPoint.y
        };
        return delta;
      })
    );
  }

  dragEndEvents(draggable: DraggableComponent): Observable<DragEvent> {
    return this.events(draggable, 'dragend').pipe(
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
