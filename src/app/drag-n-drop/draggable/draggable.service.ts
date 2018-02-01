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
      tap(e => {
        this.setDragStartPoint(e);
        this.clearSelection(e.draggable.componetRef.location.nativeElement);
      })
    );

    this.dragEvents = this.events('drag').pipe(
      map(e => {
        const delta: Coordinate2D = {
          x: e.pointerEvent.clientX - this.dragStartPoint.x,
          y: e.pointerEvent.clientY - this.dragStartPoint.y
        };
        return delta;
      })
    );

    this.dragEnterEvents = this.events('dragenter');
    this.dragLeaveEvents = this.events('dragleave');

    this.dragEndEvents = this.events('dragend').pipe(
      tap(e => {
        this.moveDraggable(e);
        this.dragStartPoint = null;
      })
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

  private clearSelection(draggable: HTMLElement): void {
    const selection = window.getSelection();
    if (selection.containsNode(draggable, true)) {
      selection.empty();
    }
  }

  private moveDraggable(e: DragEvent): void {
    // remove draggable from current host
    const i = e.draggable.container.viewContainerRef.indexOf(e.draggable.componetRef.hostView);
    if (i > -1) {
      e.draggable.container.viewContainerRef.detach(i);
    }
    // add draggable to new host
    e.target.viewContainerRef.insert(e.draggable.componetRef.hostView);
    e.draggable.container = e.target;
  }
}
