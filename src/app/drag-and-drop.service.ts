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

  constructor() { }

  dragStart(e: PointerEvent, draggable: DraggableComponent): void {
    this.draggableInTransit = draggable;
    this._isActive.next(true);
    this._events.next(new DragEvent('dragstart', draggable, e));
  }

  dragEnd(e: PointerEvent): void {
    this._events.next(new DragEvent('dragend', this.draggableInTransit, e));
    this._isActive.next(false);
    this.draggableInTransit = undefined;
  }

  drag(e: PointerEvent): void {
    this._events.next(new DragEvent('drag', this.draggableInTransit, e));
  }

  dragOver(e: PointerEvent, droppable: DroppableComponent): void {
    this._events.next(new DragEvent('dragover', droppable, e));
  }

  dragEnter(e: PointerEvent, droppable: DroppableComponent): void {
    this._events.next(new DragEvent('dragenter', droppable, e));
  }

  dragLeave(e: PointerEvent, droppable: DroppableComponent): void {
    this._events.next(new DragEvent('dragleave', droppable, e));
  }
}
