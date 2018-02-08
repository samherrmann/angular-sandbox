import { Injectable } from '@angular/core';
import { DroppableComponent } from './droppable.component';
import { DragNDropService } from '../drag-n-drop.service';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { DragEvent } from '../drag-event';
import { merge } from 'rxjs/observable/merge';

@Injectable()
export class DroppableService {

  private subscriptions: Subscription[] = [];

  constructor(private dragAndDropService: DragNDropService) { }

  register(droppable: DroppableComponent): void {
    this.subscriptions.push(
      this.handleDrag(droppable),
      this.handleDragOver(droppable)
    );
  }

  dragEnter(droppable: DroppableComponent) {
    return this.dragAndDropService.dragEnter.pipe(
      filter(e => e.target === droppable)
    );
  }

  dragLeave(droppable: DroppableComponent) {
    return this.dragAndDropService.dragLeave.pipe(
      filter(e => e.target === droppable)
    );
  }

  dragEnd() {
    return this.dragAndDropService.dragEnd;
  }

  private handleDrag(droppable: DroppableComponent): Subscription {
    return this.dragAndDropService.drag.pipe(
      filter(e => this.isPointerOverDroppable(e.pointerEvent, droppable))
    ).subscribe(e => {
      this.dragAndDropService.emitDragOver(e.pointerEvent, droppable);
    });
  }

  private handleDragOver(droppable: DroppableComponent): Subscription {
    return merge(
      this.dragAndDropService.dragStart,
      this.dragAndDropService.dragOver
    ).pipe(
      this.dragOverPairs()
    ).subscribe(events => {
      if (this.isFirstDragEnterEvent(events, droppable)) {
        this.dragAndDropService.emitDragEnter(events[0].pointerEvent, droppable);

      } else if (this.isDragLeaveEvent(events, droppable)) {
          this.dragAndDropService.emitDragLeave(events[1].pointerEvent, droppable);

      } else if (this.isDragEnterEvent(events, droppable)) {
        this.dragAndDropService.emitDragEnter(events[1].pointerEvent, droppable);
      }
    });
  }

  private isFirstDragEnterEvent(e: DragEvent[], droppable: DroppableComponent) {
    return e.length === 1 && e[0].target === droppable;
  }

  private isDragEnterEvent(e: DragEvent[], droppable: DroppableComponent) {
    return e.length === 2 && e[0].target !== droppable && e[1].target === droppable;
  }

  private isDragLeaveEvent(e: DragEvent[], droppable: DroppableComponent) {
    return e.length === 2 && e[0].target === droppable && e[1].target !== droppable;
  }

  private dragOverPairs() {
    return (source: Observable<DragEvent>) => {
      return new Observable<DragEvent[]>(subscriber => {
        let last: DragEvent;

        const sub = source.subscribe(e => {
          if (e.type === 'dragstart') {
            last = null;

          } else if (e.type === 'dragover') {
            if (last) {
              subscriber.next([last, e]);
            } else {
              subscriber.next([e]);
            }
            last = e;
          }
        });

        // on unsubscribe
        return () => sub.unsubscribe();
      });
    };
  }

  private isPointerOverDroppable(e: PointerEvent, droppable: DroppableComponent): boolean {
    const el: ClientRect = droppable.elementRef.nativeElement.getBoundingClientRect();
    return e.clientX >= el.left && e.clientX <= (el.left + el.width) &&
    e.clientY >= el.top && e.clientY <= (el.top + el.height);
  }
}
