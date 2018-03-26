import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RelocationEvent } from './relocation-event';
import { TransientRelocationService } from './transient-relocation.service';
import { CacheRelocationService } from './cache-relocation.service';
import { DragEnterEvent } from '../drag-event';

@Injectable()
export class TargetRelocationService {

  readonly operator = map<DragEnterEvent, RelocationEvent>(e => this.createRelocationEvent(e));

  constructor(private transientRelocationService: TransientRelocationService,
    private cacheRelocationService: CacheRelocationService) { }

  private createRelocationEvent(e: DragEnterEvent): RelocationEvent {
    let relocation: RelocationEvent = null;

    // if the target draggable is inside a swappable, then we need to move that
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
