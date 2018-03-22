import { Injectable, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { DragAndDropService } from '../drag-and-drop.service';
import { RelocationEvent } from './relocation-event';
import { Subscription } from 'rxjs/Subscription';
import { Location } from './location';
import { DragEnterEvent } from '../drag-event';

/**
 * This service is responsible for determining the relocation
 * of the draggable that is being dragged.
 */
@Injectable()
export class TransientRelocationService implements OnDestroy {

  private _origin: Location;

  /**
   * Translates an observable `DragEnterEvent` into a `RelocationEvent`
   * for the draggable being dragged. If the draggable does not need to
   * be relocated upon a `DragEnterEvent`, a `null` event is emitted.
   */
  readonly operator = map<DragEnterEvent, RelocationEvent>(e => this.createRelocationEvent(e));

  private subs: Subscription[] = [];

  constructor(private dragAndDropService: DragAndDropService) {
    this.subs.push(
      this.handleDragStart(),
      this.handleDragStop()
    );
  }

  /**
   * Returns the location of the draggable of where
   * it is being dragged from (i.e. the location) at
   * `dragstart`.
   */
  origin(): Location {
    return this._origin;
  }

  private createRelocationEvent(e: DragEnterEvent): RelocationEvent {
    const index = this.dropIndex(e);

    let relocation: RelocationEvent = null;
    // only emit a relocation event if the requested position is different from the
    // current position.
    if (e.draggable.droppable !== e.dropZone.location().droppable || e.draggable.index() !== index) {
      relocation = new RelocationEvent(
        e.draggable,
        e.dropZone.location().droppable,
        index
      );
    }
    return relocation;
  }

  private dropIndex(e: DragEnterEvent): number {
    const target = e.dropZone.location();
    let index = target.index;

    if (index) {
      // adjust the index if the draggable is currently located before the drop-zone
      // in the same container, i.e. if that's the case, the index of the drop-zone
      // will be reduced by one when the draggable is removed from its current location.
      if (target.droppable === e.draggable.droppable && e.draggable.index() < index) {
        index -= 1;
      }
    }
    return index;
  }

  private handleDragStart(): Subscription {
    return this.dragAndDropService.dragStart.subscribe(e => {
      this._origin = new Location(e.draggable.droppable, e.draggable.index());
    });
  }

  private handleDragStop(): Subscription {
    return this.dragAndDropService.dragEnd.subscribe(e => {
      this._origin = null;
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
