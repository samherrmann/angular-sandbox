import { Injectable, ComponentFactoryResolver, Type, ComponentRef } from '@angular/core';
import { DraggableComponent } from './draggable.component';
import { DroppableComponent } from '../droppable/droppable.component';
import { DragAndDropService } from '../drag-and-drop.service';

@Injectable()
export class DraggableFactoryService {

  private factory = this.componentFactoryResolver.resolveComponentFactory(DraggableComponent);

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private dragAndDropService: DragAndDropService) { }

  addDraggable<T>(id: string, component: Type<T>, droppable: DroppableComponent): void {
    if (!this.dragAndDropService.draggables.has(id)) {
      const draggable = this.createDraggable(droppable);
      const content = this.createContentComponent(draggable.instance, component);
      draggable.instance.onFactoryInit(draggable, content, droppable);
      this.dragAndDropService.draggables.register(id, draggable.instance);
    }
  }

  private createDraggable(droppable: DroppableComponent): ComponentRef<DraggableComponent> {
    return droppable.viewContainerRef.createComponent(this.factory);
  }

  private createContentComponent<T>(draggable: DraggableComponent, component: Type<T>) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    return draggable.viewContainerRef.createComponent(factory);
  }
}
