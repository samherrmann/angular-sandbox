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

          if (e.dropZone.container instanceof DraggableComponent) {
            const target = <DraggableComponent>e.dropZone.container;
            let index = target.index();

            if (target.container === e.draggable.container && e.draggable.index() < index) {
              index -= 1;
            }
            if (e.dropZone.dropPosition === 'after') {
              index += 1;
            }
            return new RelocationEvent(e.pointerEvent, e.draggable, target.container, index);

          } else if (e.dropZone.container instanceof DroppableComponent) {
            return new RelocationEvent(e.pointerEvent, e.draggable, e.dropZone.container, undefined);
          }

        }),
        filter(e => {
          return !(e.draggable.container === e.droppable && e.draggable.index() === e.index);
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
