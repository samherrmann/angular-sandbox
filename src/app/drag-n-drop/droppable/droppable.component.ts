import { Component, OnInit, ViewContainerRef, ViewChild, HostBinding, ElementRef, Type } from '@angular/core';
import { DroppableService } from './droppable.service';
import { DraggableFactoryService } from '../draggable/draggable-factory.service';
import { Subscription } from 'rxjs/Subscription';
import { DragNDropService } from '../drag-n-drop.service';
import { SwipeTargetService } from '../../swipe/swipe-target.service';

@Component({
  selector: 'app-droppable',
  templateUrl: './droppable.component.html',
  styleUrls: ['./droppable.component.scss'],
  providers: [
    DroppableService,
    SwipeTargetService
  ]
})
export class DroppableComponent implements OnInit {

  @ViewChild('vc', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

  @HostBinding('class.droptarget')
  isDropTarget = false;

  private subscriptions: Subscription[] = [];

  constructor(private droppableService: DroppableService,
    private draggableFactoryService: DraggableFactoryService,
    private dragAndDropService: DragNDropService,
    public elementRef: ElementRef,
    private swipeTargetService: SwipeTargetService) {}

  ngOnInit() {
    this.swipeTargetService.register(this.elementRef.nativeElement);

    this.subscriptions.push(
      this.handleSwipeEnter(),
      this.handleSwipeOver(),
      this.handleSwipeLeave(),
      this.handleDragEnter(),
      this.handleDragLeave(),
      this.handleDragEnd()
    );
  }

  addDraggable<T>(component: Type<T>): void {
    this.draggableFactoryService.addDraggable(component, this);
  }

  ngOnDestory() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private handleSwipeEnter(): Subscription {
    return this.swipeTargetService.swipeEnter.subscribe(e => {
      this.dragAndDropService.emitDragEnter(e.pointerEvent, this);
    });
  }

  private handleSwipeOver(): Subscription {
    return this.swipeTargetService.swipeOver.subscribe(e => {
      this.dragAndDropService.emitDragOver(e.pointerEvent, this);
    });
  }

  private handleSwipeLeave(): Subscription {
    return this.swipeTargetService.swipeLeave.subscribe(e => {
      this.dragAndDropService.emitDragLeave(e.pointerEvent, this);
    });
  }

  private handleDragEnter(): Subscription {
    return this.droppableService.dragEnter(this).subscribe(e => {
      this.isDropTarget = true;
    });
  }

  private handleDragLeave(): Subscription {
    return this.droppableService.dragLeave(this).subscribe(e => {
      this.isDropTarget = false;
    });
  }

  private handleDragEnd(): Subscription {
    return this.droppableService.dragEnd().subscribe(e => {
      this.isDropTarget = false;
    });
  }
}
