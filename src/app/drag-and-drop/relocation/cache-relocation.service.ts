import { Injectable } from '@angular/core';
import { DragAndDropService } from '../drag-and-drop.service';
import { map } from 'rxjs/operators';
import { RelocationEvent } from './relocation-event';
import { Cache } from './cache';
import { DragEnterEvent } from '../drag-event';

@Injectable()
export class CacheRelocationService {

  private _cache: Cache;

  readonly relocation = this.dragAndDropService.dragEnter.pipe(
    map(e => {
      const cache: Cache = this._cache;

      if (this.isOverDraggableInSwappable(e) && !this.isOverCache(e)) {
        this._cache = {
          draggable: e.dropZone.draggable(),
          location: e.dropZone.location()
        };
      } else {
        this._cache = null;
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

  private isOverDraggableInSwappable(e: DragEnterEvent): boolean {
    return e.dropZone.location().droppable.swappable && e.dropZone.draggable() !== null;
  }

  isOverCache(e: DragEnterEvent): boolean {
    return this._cache !== null && e.dropZone.draggable() === this._cache.draggable;
  }
}
