import { Injectable, OnDestroy } from '@angular/core';
import { DroppableService } from '../droppable/droppable.service';
import { DraggableComponent } from './draggable.component';
import { DragAndDropService } from '../drag-and-drop.service';
import { Subscription } from 'rxjs/Subscription';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { DragEvent } from '../drag-event';
import { Coordinate2D } from './coordinate-2d';

@Injectable()
export class DraggableService implements OnDestroy {

  private dragStartPoint: Coordinate2D;

  private subscriptions: Subscription[] = [];

  constructor(private droppableService: DroppableService,
    private dragAndDropService: DragAndDropService) {
  }

  register(draggable: DraggableComponent): void {
    this.subscriptions.push(
      this.handleDragStarEvents(draggable)
    );
  }

  dragStartEvents(draggable: DraggableComponent): Observable<DragEvent> {
    return this.events(draggable).pipe(
      filter(e => e.type === 'dragstart'),
    );
  }

  dragEvents(draggable: DraggableComponent): Observable<Coordinate2D> {
    return this.events(draggable).pipe(
      filter(e => e.type === 'drag'),
      map(e => {
        return {
          x: e.pointerEvent.clientX - this.dragStartPoint.x,
          y: e.pointerEvent.clientY - this.dragStartPoint.y
        };
      })
    );
  }

  dragEndEvents(draggable: DraggableComponent): Observable<DragEvent> {
    return this.events(draggable).pipe(
      filter(e => e.type === 'dragend'),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private events(draggable: DraggableComponent): Observable<DragEvent> {
    return this.dragAndDropService.events.pipe(
      filter(e => e.draggable === draggable),
    );
  }

  private handleDragStarEvents(draggable: DraggableComponent): Subscription {
    return this.dragStartEvents(draggable).subscribe(e => {
      this.dragStartPoint = {
        x: e.pointerEvent.clientX,
        y: e.pointerEvent.clientY
      };
    });
  }
}
