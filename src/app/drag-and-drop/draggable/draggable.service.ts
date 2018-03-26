import { Injectable } from '@angular/core';
import { DragAndDropService } from '../drag-and-drop.service';
import { Observable } from 'rxjs/Observable';
import { DragEvent, RemoveEvent, InsertEvent } from '../drag-event';
import { filter, map, tap } from 'rxjs/operators';
import { DraggableComponent } from './draggable.component';
import { Coordinate2D } from './coordinate-2d';
import { MonoTypeOperatorFunction } from 'rxjs/interfaces';

/**
 * This service proxies events from the {@link DragAndDropService}
 * and only passes through the events that are applicable to the
 * registered {@link DraggableComponent}.
 *
 * This service is designed to be provided to the {@link DraggableComponent}.
 */
@Injectable()
export class DraggableService {

  /**
   * Observable emitting `true` if the registered draggable
   * is in transit. Emits false otherwise.
   */
  inTransit: Observable<boolean>;

  /**
   * Observable emitting `dragstart` events if the draggable
   * in transit is the registered draggble.
   */
  dragStart: Observable<DragEvent>;

  /**
   * Observable emitting `drag` events if the draggable
   * in transit is the registered draggble.
   */
  drag: Observable<Coordinate2D>;

  /**
   * Observable emitting `dragend` event if the draggable
   * in transit is the registered draggble.
   */
  dragEnd: Observable<DragEvent>;

  /**
   * Observable emitting `remove` event if the draggable
   * in transit is the registered draggble.
   */
  remove: Observable<RemoveEvent>;

  /**
   * Observable emitting `insert` event if the draggable
   * in transit is the registered draggble.
   */
  insert: Observable<InsertEvent>;

  /**
   * Observable emitting `true` if a draggable instance other
   * than the instance of the registered draggable is in
   * transit. Emits `false` otherwise.
   */
  target: Observable<boolean>;

  /**
   * The coordinates of the draggable relative to the
   * browser window at the time of `dragstart`.
   */
  private dragStartPoint: Coordinate2D;

  constructor(private dragAndDropService: DragAndDropService) { }

  /**
   * Registeres the instance of the draggable that this
   * service is supporting.
   */
  register(draggable: DraggableComponent): void {

    this.inTransit = this.dragAndDropService.inTransit.pipe(
      map(e => e === draggable)
    );
    this.dragStart = this.dragAndDropService.dragStart.pipe(
      this.filterInstance(draggable),
      tap(e => this.setDragStartPoint(e))
    );
    this.drag = this.dragAndDropService.drag.pipe(
      this.filterInstance(draggable),
      map(e => this.dragPositionDelta(e))
    );
    this.dragEnd = this.dragAndDropService.dragEnd.pipe(
      this.filterInstance(draggable),
      tap(e => this.dragStartPoint = null)
    );
    this.target = this.dragAndDropService.inTransit.pipe(
      map(e => e !== null && e !== draggable)
    );
    this.remove = this.dragAndDropService.remove.pipe(
      this.filterInstance(draggable)
    );
    this.insert = this.dragAndDropService.insert.pipe(
      this.filterInstance(draggable)
    );
  }

  /**
   * Returns a RxJs `filter` operator that only passes through
   * events that are applicable to the registered draggable.
   * @param draggable The registered draggable.
   */
  private filterInstance(draggable: DraggableComponent): MonoTypeOperatorFunction<DragEvent> {
    return filter<DragEvent>(e => e.draggable === draggable);
  }

  private setDragStartPoint(e: DragEvent): void {
    this.dragStartPoint = {
      x: e.pointerEvent.clientX,
      y: e.pointerEvent.clientY
    };
  }

  /**
   * Returns the position delta between the current drag event
   * position and the drag start position.
   */
  private dragPositionDelta(e: DragEvent): Coordinate2D {
    return {
      x: e.pointerEvent.clientX - this.dragStartPoint.x,
      y: e.pointerEvent.clientY - this.dragStartPoint.y
    };
  }
}
