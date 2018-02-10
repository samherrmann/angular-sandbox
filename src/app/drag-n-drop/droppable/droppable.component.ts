import { Component, OnInit, ViewContainerRef, ViewChild, HostBinding, ElementRef, Type, Host } from '@angular/core';
import { DroppableService } from './droppable.service';
import { DraggableFactoryService } from '../draggable/draggable-factory.service';
import { Subscription } from 'rxjs/Subscription';
import { DragNDropService } from '../drag-n-drop.service';
import { SwipeTargetDirective } from './swipe-target.directive';

@Component({
  selector: 'app-droppable',
  templateUrl: './droppable.component.html',
  styleUrls: ['./droppable.component.scss'],
  providers: [
    DroppableService
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
    @Host() private swipeTargetDirective: SwipeTargetDirective) {}

  ngOnInit() {
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
    return this.swipeTargetDirective.appSwipeEnter.subscribe(e => {
      if (this.dragAndDropService.isActive()) {
        this.dragAndDropService.emitDragEnter(e.pointerEvent, this);
      }
    });
  }

  private handleSwipeOver(): Subscription {
    return this.swipeTargetDirective.appSwipeOver.subscribe(e => {
      if (this.dragAndDropService.isActive()) {
        this.dragAndDropService.emitDragOver(e.pointerEvent, this);
      }
    });
  }

  private handleSwipeLeave(): Subscription {
    return this.swipeTargetDirective.appSwipeLeave.subscribe(e => {
      if (this.dragAndDropService.isActive()) {
        this.dragAndDropService.emitDragLeave(e.pointerEvent, this);
      }
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
