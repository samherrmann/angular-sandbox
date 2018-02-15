import { Injectable, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { DragAndDropService } from '../drag-and-drop.service';
import { RelocationEvent } from './relocation-event';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '../location';

@Injectable()
export class TransientRelocationService implements OnDestroy {

  private _origin: Location;

  readonly relocation = this.dragAndDropService.dragEnter.pipe(
    map(e => {
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

      let relocation: RelocationEvent = null;
      // only emit a relocation event if the requested position is different from the
      // current position.
      if (e.draggable.droppable !== target.droppable || e.draggable.index() !== index) {
        relocation = new RelocationEvent(
          e.pointerEvent,
          e.draggable,
          target.droppable,
          index
        );
      }
      return relocation;
    })
  );

  private subs: Subscription[] = [];

  constructor(private dragAndDropService: DragAndDropService) {
    this.subs.push(
      this.handleDragStart(),
      this.handleDragStop()
    );
  }

  origin(): Location {
    return this._origin;
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
