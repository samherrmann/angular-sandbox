import { Component, HostListener, OnInit,
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
export class DraggableComponent implements OnInit {

  @ViewChild('vc', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

  componetRef: ComponentRef<DraggableComponent>;

  container: DroppableComponent;

  constructor(private dragAndDropService: DragAndDropService,
    private draggableService: DraggableService) { }

  ngOnInit() {
    this.draggableService.register(this);
  }

  @HostListener('pointerdown', ['$event'])
  pointerDown(e: PointerEvent) {
    this.dragAndDropService.dragStart(e, this);
  }
}
