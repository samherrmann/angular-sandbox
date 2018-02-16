import { Injectable, OnDestroy } from '@angular/core';
import { DragAndDropService } from '../drag-and-drop.service';
import { map } from 'rxjs/operators';
import { RelocationEvent } from './relocation-event';
import { Cache } from './cache';
import { DragEnterEvent } from '../drag-event';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class CacheRelocationService implements OnDestroy {

  private readonly cache = new Cache();

  private sub: Subscription;

  readonly relocation = this.dragAndDropService.dragEnter.pipe(
    map(e => {
      const relocation = this.createRelocationEvent(e);
      this.handleCaching(e);
      return relocation;
    })
  );

  constructor(private dragAndDropService: DragAndDropService) {
    this.sub = this.dragAndDropService.dragEnd.subscribe(() => this.cache.clear());
  }

  isOverCache(e: DragEnterEvent): boolean {
    return !this.cache.isEmpty() && e.dropZone.draggable() === this.cache.draggable();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private createRelocationEvent(e: DragEnterEvent): RelocationEvent {
    let relocation: RelocationEvent = null;

    // create relocation event if cache is not empty
    if (!this.cache.isEmpty()) {
      relocation = new RelocationEvent(
        this.cache.draggable(),
        this.cache.location().droppable,
        this.cache.location().index
      );
    }
    return relocation;
  }

  private handleCaching(e: DragEnterEvent): void {
    // add target to cache if target is inside a swappable and the
    // target is not the cached draggable.
    if (this.isOverDraggableInSwappable(e) && !this.isOverCache(e)) {
      this.cache.set(e.dropZone.draggable(), e.dropZone.location());
    } else {
      this.cache.clear();
    }
  }

  private isOverDraggableInSwappable(e: DragEnterEvent): boolean {
    return e.dropZone.location().droppable.swappable && e.dropZone.draggable() !== null;
  }
}
