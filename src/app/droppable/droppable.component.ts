import { Component, OnInit, HostListener, ViewContainerRef, ViewChild, ComponentFactoryResolver,
  ComponentFactory, HostBinding, ElementRef } from '@angular/core';
import { DraggableComponent } from '../draggable/draggable.component';
import { DroppableService } from './droppable.service';
import { DraggableFactoryService } from '../draggable/draggable-factory.service';

@Component({
  selector: 'app-droppable',
  templateUrl: './droppable.component.html',
  styleUrls: ['./droppable.component.scss']
})
export class DroppableComponent implements OnInit {

  @ViewChild('vc', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

  @HostBinding('class.droptarget')
  isDropTarget = false;

  constructor(public elementRef: ElementRef,
    private droppableService: DroppableService,
    private draggableFactoryService: DraggableFactoryService) { }

  ngOnInit() {
    this.droppableService.register(this);
  }

  addDraggable(): void {
    this.draggableFactoryService.addDraggable(this);
  }

  ngOnDestory() {
    this.droppableService.unregister(this);
  }
}
