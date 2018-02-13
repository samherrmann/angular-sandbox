import { Injectable, OnDestroy } from '@angular/core';
import { DragAndDropService } from './drag-and-drop.service';
import { Subscription } from 'rxjs/Subscription';
import { DraggableComponent } from './draggable/draggable.component';
import { DroppableComponent } from './droppable/droppable.component';
import { map, filter } from 'rxjs/operators';
import { RelocationEvent } from './relocation-event';

@Injectable()
export class RelocationService implements OnDestroy {

  private subs: Subscription[] = [];

  constructor(private dragAndDropService: DragAndDropService) { }

  init() {
    this.subs.push(
      this.dragAndDropService.dragEnter.pipe(
        map(e => {

          if (e.target.host instanceof DraggableComponent) {
            const host = <DraggableComponent>e.target.host;
            const currentIndex = e.draggable.index();
            let index = host.index();

            if (currentIndex < index) {
              index -= 1;
            }
            if (e.target.dropPosition === 'after') {
              index += 1;
            }
            return new RelocationEvent(e.pointerEvent, e.draggable, e.draggable.container, index);

          } else if (e.target.host instanceof DroppableComponent) {
            return new RelocationEvent(e.pointerEvent, e.draggable, e.target.host, undefined);
          }

        }),
        filter(e => {
          return e.draggable.index() !== e.index;
        })
      ).subscribe(e => {
        e.draggable.detatch();
        e.draggable.insert(e.droppable, e.index);
        this.dragAndDropService.emitDrop(e.pointerEvent, e.draggable);
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
