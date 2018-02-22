import { Directive, TemplateRef } from '@angular/core';
import { DraggableFactoryService } from './draggable/draggable-factory.service';
import { DroppableComponent } from './droppable/droppable.component';

@Directive({
  selector: '[dndTemplate]'
})
export class TemplateDirective<T> {

  constructor(private templateRef: TemplateRef<any>,
    private draggableFactoryService: DraggableFactoryService, ) {
  }

  create(id: string, droppable: DroppableComponent, ctx?: T): void {
    this.draggableFactoryService.create(id, this.templateRef, droppable, ctx);
  }
}
