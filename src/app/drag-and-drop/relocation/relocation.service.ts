import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { map, filter } from 'rxjs/operators';
import { RelocationEvent } from './relocation-event';
import { zip } from 'rxjs/observable/zip';
import { Observable } from 'rxjs/Observable';
import { DragAndDropService } from '../drag-and-drop.service';
import { TransientRelocationService } from './transient-relocation.service';
import { TargetRelocationService } from './target-relocation.service';
import { CacheRelocationService } from './cache-relocation.service';
import { OperatorFunction } from 'rxjs/interfaces';
import { DragEnterEvent } from '../drag-event';

/**
 * This service is responsible for relocating draggables during
 * a drag and drop operation. It first detatches all draggables
 * that require to be relocated, and then inserts all of them in
 * their new location.
 */
@Injectable()
export class RelocationService implements OnDestroy {

  private sub: Subscription;

  /**
   * RxJs operators that translate observable `DragEnterEvent`s into
   * `RelocationEvent`s. Every operator must emit an event for every
   * `DragEnterEvent`. If no relocation is required for a given
   * `DragEnterEvent`, then the operator must emit `null`.
   */
  private operators: OperatorFunction<DragEnterEvent, RelocationEvent>[] = [];

  constructor(private dragAndDropService: DragAndDropService,
              transientRelocationService: TransientRelocationService,
              targetRelocationService: TargetRelocationService,
              cacheRelocationService: CacheRelocationService) {
    this.operators.push(
      transientRelocationService.operator,
      targetRelocationService.operator,
      cacheRelocationService.operator
    );
  }

  init(): void {
    this.sub = this.handleRelocations(
      this.operators.map(operator => this.dragAndDropService.dragEnter.pipe(operator))
    );
  }

  private handleRelocations(relocations: Observable<RelocationEvent>[]): Subscription {
    return zip(...relocations).pipe(
      map(events => events.filter(e => e !== null)),
      filter(events => events.length > 0)
    ).subscribe(events => {
      events.forEach(e => {
        e.draggable.detatch();
      });
      events.forEach(e => {
        e.draggable.insert(e.droppable, e.index);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
