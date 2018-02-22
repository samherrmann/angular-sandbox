import { Injectable, TemplateRef, EmbeddedViewRef } from '@angular/core';
import { DraggableComponent } from './draggable.component';
import { DroppableComponent } from '../droppable/droppable.component';
import { DragAndDropService } from '../drag-and-drop.service';
import { Subject } from 'rxjs/Subject';
import { zip } from 'rxjs/observable/zip';

@Injectable()
export class DraggableFactoryService {

  private newDraggable = new Subject<DraggableComponent>();

  private newEmbeddedDraggableView = new Subject<EmbeddedDraggableView>();

  constructor(private dragAndDropService: DragAndDropService) {

    zip(this.newEmbeddedDraggableView, this.newDraggable).subscribe(e => {
      const embeddedDraggableView = e[0];
      const draggable = e[1];
      draggable.onFactoryInit(
        embeddedDraggableView.id,
        embeddedDraggableView.embeddedViewRef,
        embeddedDraggableView.droppable);
    });
  }

  create<T>(id: string, tpl: TemplateRef<T>, droppable: DroppableComponent, ctx?: T): void {
    if (!this.dragAndDropService.draggables.has(id)) {
      const embeddedViewRef = droppable.viewContainerRef.createEmbeddedView(tpl, ctx);

      this.newEmbeddedDraggableView.next({
        id: id,
        embeddedViewRef: embeddedViewRef,
        droppable: droppable
      });
    }
  }

  register(draggable: DraggableComponent): void {
    this.newDraggable.next(draggable);
  }
}

interface EmbeddedDraggableView {
  id: string;
  embeddedViewRef: EmbeddedViewRef<any>;
  droppable: DroppableComponent;
}
