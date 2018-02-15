import { Injectable, OnDestroy } from '@angular/core';
import { DragAndDropService } from '../drag-and-drop.service';
import { map } from 'rxjs/operators';
import { RelocationEvent } from './relocation-event';
import { Cache } from './cache';
import { DragEnterEvent } from '../drag-event';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class CacheRelocationService implements OnDestroy {

  private _cache: Cache;

  private sub: Subscription;

  readonly relocation = this.dragAndDropService.dragEnter.pipe(
    map(e => {
      const cache: Cache = this._cache;

      if (this.isOverDraggableInSwappable(e) && !this.isOverCache(e)) {
        this._cache = {
          draggable: e.dropZone.draggable(),
          location: e.dropZone.location()
        };
      } else {
        this.clear();
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

  constructor(private dragAndDropService: DragAndDropService) {
    this.sub = this.dragAndDropService.dragEnd.subscribe(() => this.clear());
  }

  isOverCache(e: DragEnterEvent): boolean {
    return this._cache !== null && e.dropZone.draggable() === this._cache.draggable;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private clear(): void {
    this._cache = null;
  }

  private isOverDraggableInSwappable(e: DragEnterEvent): boolean {
    return e.dropZone.location().droppable.swappable && e.dropZone.draggable() !== null;
  }
}
