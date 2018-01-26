import { Injectable, ComponentFactory, ComponentFactoryResolver, Type, ComponentRef } from '@angular/core';
import { DraggableComponent } from './draggable.component';
import { DroppableComponent } from '../droppable/droppable.component';

@Injectable()
export class DraggableFactoryService {

  private factory: ComponentFactory<DraggableComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.factory = this.componentFactoryResolver.resolveComponentFactory(DraggableComponent);
  }

  addDraggable<T>(component: Type<T>, droppable: DroppableComponent): void {
    this.createContentComponent(this.createDraggable(droppable).instance, component);
  }

  private createDraggable(droppable: DroppableComponent): ComponentRef<DraggableComponent> {
    const componentRef = droppable.viewContainerRef.createComponent(this.factory);
    componentRef.instance.componetRef = componentRef;
    componentRef.instance.container = droppable;
    return componentRef;
  }

  private createContentComponent<T>(draggable: DraggableComponent, component: Type<T>) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    draggable.viewContainerRef.createComponent(factory);
  }
}
