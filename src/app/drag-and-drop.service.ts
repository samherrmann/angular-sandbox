import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { DragEvent } from './drag-event';
import { DraggableComponent } from './draggable/draggable.component';
import { DroppableComponent } from './droppable/droppable.component';


@Injectable()
export class DragAndDropService {

  private readonly _events = new Subject<DragEvent>();
  readonly events = this._events.asObservable();

  private readonly _isActive = new BehaviorSubject(false);
  readonly isActive = this._isActive.asObservable();

  private draggableInTransit: DraggableComponent;

  private target: DroppableComponent;

  constructor() { }

  dragStart(e: PointerEvent, draggable: DraggableComponent): void {
    this.draggableInTransit = draggable;
    this.target = draggable.host;

    this._isActive.next(true);
    this._events.next(new DragEvent('dragstart', e, draggable, this.target));
  }

  dragEnd(e: PointerEvent): void {
    this._events.next(new DragEvent('dragend', e, this.draggableInTransit, this.target));
    this._isActive.next(false);
    this.draggableInTransit = undefined;
    this.target = undefined;
  }

  drag(e: PointerEvent): void {
    this._events.next(new DragEvent('drag', e, this.draggableInTransit, this.target));
  }

  dragOver(e: PointerEvent, droppable: DroppableComponent): void {
    this.target = droppable;
    this._events.next(new DragEvent('dragover', e, this.draggableInTransit, this.target));
  }

  dragEnter(e: PointerEvent, droppable: DroppableComponent): void {
    this._events.next(new DragEvent('dragenter', e, this.draggableInTransit, droppable));
  }

  dragLeave(e: PointerEvent, droppable: DroppableComponent): void {
    this._events.next(new DragEvent('dragleave', e, this.draggableInTransit, droppable));
  }
}
