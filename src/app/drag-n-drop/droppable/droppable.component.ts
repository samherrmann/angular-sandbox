import { Component, OnInit, ViewContainerRef, ViewChild, HostBinding, ElementRef, Type, Renderer2 } from '@angular/core';
import { DroppableService } from './droppable.service';
import { DraggableFactoryService } from '../draggable/draggable-factory.service';
import { Subscription } from 'rxjs/Subscription';

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

  constructor(private renderer: Renderer2,
    public elementRef: ElementRef,
    private droppableService: DroppableService,
    private draggableFactoryService: DraggableFactoryService) { }

  ngOnInit() {
    this.droppableService.register(this);
    this.subscriptions.push(
      this.handleDragEnter(),
      this.handleDragLeave(),
      this.handleDragEnd()
    );
  }

  private handleDragEnter(): Subscription {
    return this.droppableService.dragEnterEvents(this).subscribe(e => {
      this.isDropTarget = true;
      this.insertShadow(
        this.elementRef.nativeElement,
        e.draggable.componetRef.location.nativeElement,
        e.draggable.shadow
      );
    });
  }

  private handleDragLeave(): Subscription {
    return this.droppableService.dragLeaveEvents(this).subscribe(e => {
      this.isDropTarget = false;
      this.removeShadow(this.elementRef.nativeElement, e.draggable.shadow);
    });
  }

  private handleDragEnd(): Subscription {
    return this.droppableService.dragEndEvents().subscribe(e => {
      this.isDropTarget = false;
      this.removeShadow(this.elementRef.nativeElement, e.draggable.shadow);
    });
  }

  private insertShadow(droppable: HTMLElement, draggable: HTMLElement, shadow: HTMLElement) {
    if (draggable.parentNode === this.elementRef.nativeElement) {
      this.renderer.insertBefore(droppable, shadow, draggable);

    } else {
      this.renderer.appendChild(droppable, shadow);
    }
  }

  private removeShadow(droppable: HTMLElement, shadow: HTMLElement) {
    if (shadow.parentNode === droppable) {
      this.renderer.removeChild(droppable, shadow);
    }
  }

  addDraggable<T>(component: Type<T>): void {
    this.draggableFactoryService.addDraggable(component, this);
  }

  ngOnDestory() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
