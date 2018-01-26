import { Injectable, ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { DraggableComponent } from './draggable.component';
import { DroppableComponent } from '../droppable/droppable.component';

@Injectable()
export class DraggableFactoryService {

  private factory: ComponentFactory<DraggableComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.factory = this.componentFactoryResolver.resolveComponentFactory(DraggableComponent);
  }

  addDraggable(droppable: DroppableComponent): void {
    const componentRef = droppable.viewContainerRef.createComponent(this.factory);
    componentRef.instance.componetRef = componentRef;
    componentRef.instance.container = droppable;
  }
}
