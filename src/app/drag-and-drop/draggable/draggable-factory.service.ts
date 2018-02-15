import { Injectable, ComponentFactoryResolver, Type, ComponentRef } from '@angular/core';
import { DraggableComponent } from './draggable.component';
import { DroppableComponent } from '../droppable/droppable.component';

@Injectable()
export class DraggableFactoryService {

  private factory = this.componentFactoryResolver.resolveComponentFactory(DraggableComponent);

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  addDraggable<T>(component: Type<T>, droppable: DroppableComponent): void {
    // TODO: Investigate eliminating the `setTimeout`
    setTimeout(() => {
      const draggable = this.createDraggable(droppable);
      const content = this.createContentComponent(draggable.instance, component);
      draggable.instance.onFactoryInit(draggable, content, droppable);
    });
  }

  private createDraggable(droppable: DroppableComponent): ComponentRef<DraggableComponent> {
    return droppable.viewContainerRef.createComponent(this.factory);
  }

  private createContentComponent<T>(draggable: DraggableComponent, component: Type<T>) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    return draggable.viewContainerRef.createComponent(factory);
  }
}
