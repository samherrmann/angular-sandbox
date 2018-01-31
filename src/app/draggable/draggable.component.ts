import { Component, HostListener, OnInit, OnDestroy,
  ComponentRef, ViewChild, ViewContainerRef, HostBinding } from '@angular/core';
import {  DraggableService } from './draggable.service';
import { DragAndDropService } from '../drag-and-drop.service';
import { DroppableComponent } from '../droppable/droppable.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.scss'],
  providers: [
    DraggableService
  ]
})
export class DraggableComponent implements OnInit, OnDestroy {

  @ViewChild('vc', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

  @HostBinding('style.transform')
  transform = 'none';

  componetRef: ComponentRef<DraggableComponent>;

  container: DroppableComponent;

  private subscriptions: Subscription[] = [];

  constructor(private dragAndDropService: DragAndDropService,
    private draggableService: DraggableService) { }

  ngOnInit() {
    this.draggableService.register(this);
    this.subscriptions.push(
      this.handleDrag()
    );
  }

  @HostListener('pointerdown', ['$event'])
  pointerDown(e: PointerEvent) {
    this.dragAndDropService.dragStart(e, this);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private handleDrag() {
    return this.draggableService.dragEvents(this).subscribe(delta => {
      this.transform = 'translate(' + delta.x + 'px, ' + delta.y + 'px)';
    });
  }
}
