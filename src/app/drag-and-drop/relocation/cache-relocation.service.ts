import { Injectable } from '@angular/core';
import { DragAndDropService } from '../drag-and-drop.service';
import { map } from 'rxjs/operators';
import { RelocationEvent } from './relocation-event';
import { Cache } from './cache';

@Injectable()
export class CacheRelocationService {

  private cache: Cache;

  readonly relocation = this.dragAndDropService.dragEnter.pipe(
    map(e => {
      const cache: Cache = this.cache;

      if (e.dropZone.location().droppable.swappable && e.dropZone.draggable() !== null) {
        this.cache = {
          draggable: e.dropZone.draggable(),
          location: e.dropZone.location()
        };
      } else {
        this.cache = null;
      }

      let relocation: RelocationEvent = null;
      if (cache) {
        relocation = new RelocationEvent(
          e.pointerEvent,
          cache.draggable,
          cache.location.droppable,
          cache.location.index
        );
      }
      return relocation;
    })
  );

  constructor(private dragAndDropService: DragAndDropService) { }

}
