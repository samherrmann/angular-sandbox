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

@Injectable()
export class RelocationService implements OnDestroy {

  private sub: Subscription;

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
