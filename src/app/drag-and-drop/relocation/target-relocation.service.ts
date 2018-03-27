import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RelocationEvent } from './relocation-event';
import { TransientRelocationService } from './transient-relocation.service';
import { CacheRelocationService } from './cache-relocation.service';
import { DragEnterEvent } from '../drag-event';

/**
 * This service is responsible for determining the relocation
 * of target draggables that are located inside of a swappable.
 * A target draggable is a draggable that is the source of the
 * `dragenter` event. In other words, when draggable A is being
 * dragged over draggable B, then draggable B is the target
 * draggable.
 */
@Injectable()
export class TargetRelocationService {

  /**
   * Translates an observable `DragEnterEvent` into a `RelocationEvent`
   * for a target draggable. If no draggable exists in the location of
   * the source `dragenter` event, a `null` event is emitted.
   */
  readonly operator = map<DragEnterEvent, RelocationEvent>(e => this.createRelocationEvent(e));

  constructor(private transientRelocationService: TransientRelocationService,
              private cacheRelocationService: CacheRelocationService) {}

  private createRelocationEvent(e: DragEnterEvent): RelocationEvent {
    let relocation: RelocationEvent = null;

    // If the target draggable is inside a swappable, then we need to move that
    // draggable into the origin location of the transient draggable.
    if (this.isOverDraggableTargetInsideSwappable(e) &&
      !this.cacheRelocationService.isOverCache(e)) {
      const transientOrigin = this.transientRelocationService.origin();

      relocation = new RelocationEvent(
        e.dropZone.draggable(),
        transientOrigin.droppable,
        transientOrigin.index
      );
    }
    return relocation;
  }

  private isOverDraggableTargetInsideSwappable(e: DragEnterEvent): boolean {
    return e.dropZone.draggable() !== null && e.dropZone.location().droppable.swappable;
  }
}
