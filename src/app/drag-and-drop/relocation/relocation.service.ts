import { Injectable, OnDestroy } from '@angular/core';
import { DragAndDropService } from '../drag-and-drop.service';
import { Subscription } from 'rxjs/Subscription';
import { map, filter } from 'rxjs/operators';
import { RelocationEvent } from './relocation-event';
import { zip } from 'rxjs/observable/zip';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RelocationService implements OnDestroy {

  private sub: Subscription;

  constructor(private dragAndDropService: DragAndDropService) { }

  init(relocations: Observable<RelocationEvent>[]) {
    this.sub = this.handleRelocations(relocations);
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
        this.dragAndDropService.emitDrop(e.pointerEvent, e.draggable);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
