import { Component, ViewContainerRef, ViewChild, Type } from '@angular/core';
import { DraggableFactoryService } from '../draggable/draggable-factory.service';
import { SwipeTargetService } from '../../swipe/swipe-target.service';

@Component({
  selector: 'app-droppable',
  templateUrl: './droppable.component.html',
  styleUrls: ['./droppable.component.scss'],
  providers: [
    SwipeTargetService
  ]
})
export class DroppableComponent {

  @ViewChild('vc', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

  constructor(private draggableFactoryService: DraggableFactoryService) {}

  addDraggable<T>(component: Type<T>): void {
    this.draggableFactoryService.addDraggable(component, this);
  }
}
