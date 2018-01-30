import { Component, HostListener,
  ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import {  DraggableService } from './draggable.service';
import { DragAndDropService } from '../drag-and-drop.service';
import { DroppableComponent } from '../droppable/droppable.component';

@Component({
  selector: 'app-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.scss'],
  providers: [
    DraggableService
  ]
})
export class DraggableComponent {

  @ViewChild('vc', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

  componetRef: ComponentRef<DraggableComponent>;

  container: DroppableComponent;

  constructor(private dragAndDropService: DragAndDropService) { }

  @HostListener('pointerdown', ['$event'])
  pointerDown(e: PointerEvent) {
    this.dragAndDropService.dragStart(e, this);
  }
}
