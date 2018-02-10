import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { DragEvent } from './drag-event';
import { DraggableComponent } from './draggable/draggable.component';
import { DroppableComponent } from './droppable/droppable.component';
import { filter, flatMap, takeUntil } from 'rxjs/operators';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DragNDropService {

  private readonly _active = new BehaviorSubject(false);
  readonly active = this._active.asObservable();

  private draggableInTransit: DraggableComponent;

  private target: DroppableComponent;

  private readonly _dragStart = new Subject<DragEvent>();
  readonly dragStart = this._dragStart.asObservable();

  private readonly _drag = new Subject<DragEvent>();
  readonly drag = this._drag.asObservable();

  private readonly _dragEnter = new Subject<DragEvent>();
  readonly dragEnter = this._dragEnter.asObservable();

  private readonly _dragOver = new Subject<DragEvent>();
  readonly dragOver = this._dragOver.asObservable();

  private readonly _dragLeave = new Subject<DragEvent>();
  readonly dragLeave = this._dragLeave.asObservable();

  private readonly _dragEnd = new Subject<DragEvent>();
  readonly dragEnd = this._dragEnd.asObservable();

  constructor() { }

  emitDragStart(e: PointerEvent, draggable: DraggableComponent): void {
    this.draggableInTransit = draggable;
    this.target = draggable.container;

    this._active.next(true);
    this._dragStart.next(new DragEvent('dragstart', e, draggable, this.target));
  }

  emitDragEnd(e: PointerEvent): void {
    this._dragEnd.next(new DragEvent('dragend', e, this.draggableInTransit, this.target));
    this._active.next(false);
    this.draggableInTransit = null;
    this.target = null;
  }

  emitDrag(e: PointerEvent): void {
    this._drag.next(new DragEvent('drag', e, this.draggableInTransit, this.target));
  }

  emitDragOver(e: PointerEvent, droppable: DroppableComponent): void {
    this.target = droppable;
    this._dragOver.next(new DragEvent('dragover', e, this.draggableInTransit, this.target));
  }

  emitDragEnter(e: PointerEvent, droppable: DroppableComponent): void {
    this._dragEnter.next(new DragEvent('dragenter', e, this.draggableInTransit, droppable));
  }

  emitDragLeave(e: PointerEvent, droppable: DroppableComponent): void {
    this._dragLeave.next(new DragEvent('dragleave', e, this.draggableInTransit, droppable));
  }

  listenWhenActive<T>(el: EventTarget, eventName: string): Observable<T> {
    return this.active.pipe(
      filter(e => e === true),
      flatMap(() => {
        return fromEvent<T>(el, eventName).pipe(
          takeUntil(this.active.pipe(filter(e => e === false)))
        );
      })
    );
  }
}
