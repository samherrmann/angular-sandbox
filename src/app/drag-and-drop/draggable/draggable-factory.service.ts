import { Injectable, TemplateRef, ViewRef } from '@angular/core';
import { DraggableComponent } from './draggable.component';
import { DroppableComponent } from '../droppable/droppable.component';
import { DragAndDropService } from '../drag-and-drop.service';
import { Subject } from 'rxjs/Subject';
import { zip } from 'rxjs/observable/zip';

@Injectable()
export class DraggableFactoryService {

  private newInstance = new Subject<DraggableComponent>();

  private newView = new Subject<View>();

  constructor(private dragAndDropService: DragAndDropService) {

    zip(this.newView, this.newInstance).subscribe(e => {
      const view = e[0];
      const instance = e[1];

      instance.onFactoryInit(
        view.id,
        view.viewRef,
        view.droppable);
    });
  }

  create<T>(id: string, tpl: TemplateRef<T>, droppable: DroppableComponent, ctx?: T): void {
    if (!this.dragAndDropService.draggables.has(id)) {
      const viewRef = droppable.viewContainerRef.createEmbeddedView(tpl, ctx);

      this.newView.next({
        id: id,
        viewRef: viewRef,
        droppable: droppable
      });
    }
  }

  register(draggable: DraggableComponent): void {
    this.newInstance.next(draggable);
  }
}

interface View {
  id: string;
  viewRef: ViewRef;
  droppable: DroppableComponent;
}
