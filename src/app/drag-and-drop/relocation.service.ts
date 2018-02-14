import { Injectable, OnDestroy } from '@angular/core';
import { DragAndDropService } from './drag-and-drop.service';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { RelocationEvent } from './relocation-event';
import { Location } from './location';
import { zip } from 'rxjs/observable/zip';

@Injectable()
export class RelocationService implements OnDestroy {

  private transientOrigin: Location;

  private transientRelocation = this.dragAndDropService.dragEnter.pipe(
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
      return new RelocationEvent(e.pointerEvent, e.draggable, target.droppable, index);
    }),
    map(e => {
      // only emit a relocation event if the requested position is different from the
      // current position.
      if (e.draggable.droppable === e.droppable && e.draggable.index() === e.index) {
        return null;
      } else {
        return e;
      }
    })
  );

  private targetRelocation = this.dragAndDropService.dragEnter.pipe(
    map(e => {
      if (e.dropZone.location().droppable.swap && e.dropZone.draggable() !== null) {
        return new RelocationEvent(
          e.pointerEvent,
          e.dropZone.draggable(),
          this.transientOrigin.droppable,
          this.transientOrigin.index
        );
      } else {
        return null;
      }
    })
  );

  private allRelocations = zip(
    this.transientRelocation,
    this.targetRelocation
  ).pipe(
    map(events => events.filter(e => e !== null)),
    filter(events => events.length > 0)
  );

  private subs: Subscription[] = [];

  constructor(private dragAndDropService: DragAndDropService) { }

  init() {
    this.subs.push(
      this.handleRelocations(),
      this.dragAndDropService.dragStart.subscribe(e => {
        this.transientOrigin = new Location(e.draggable.droppable, e.draggable.index());
      }),
      this.dragAndDropService.dragEnd.subscribe(e => {
        this.transientOrigin = null;
      })
    );
  }

  private handleRelocations(): Subscription {
    return this.allRelocations.subscribe(events => {
      events.forEach(e => {
        e.draggable.detatch();
      });
      events.forEach(e => {
        e.draggable.insert(e.droppable, e.index);
        this.dragAndDropService.emitDrop(e.pointerEvent, e.draggable);
      });
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
