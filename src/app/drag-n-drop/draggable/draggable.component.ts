import { Component, OnInit, OnDestroy, ComponentRef, ViewChild, ViewContainerRef,
  HostBinding, ElementRef, Renderer2 } from '@angular/core';
import {  DraggableService } from './draggable.service';
import { DroppableComponent } from '../droppable/droppable.component';
import { Subscription } from 'rxjs/Subscription';
import { DragEvent } from '../drag-event';

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

  @HostBinding('class.in-transit')
  isInTransit = false;

  @HostBinding('style.transform')
  transform = 'none';

  @HostBinding('style.width')
  width: string;

  @HostBinding('style.height')
  height: string;

  @HostBinding('style.top')
  top: string;

  @HostBinding('style.left')
  left: string;

  componetRef: ComponentRef<DraggableComponent>;

  container: DroppableComponent;

  shadow: HTMLElement;

  private subscriptions: Subscription[] = [];

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef,
    private draggableService: DraggableService) { }

  ngOnInit() {
    this.draggableService.register(this);
    this.subscriptions.push(
      this.handleDragStart(),
      this.handleDrag(),
      this.handleDragEnter(),
      this.handleDragLeave(),
      this.handleDragEnd()
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private handleDragStart() {
    return this.draggableService.dragStartEvents.subscribe(e => {
      this.clearSelection(e.draggable.componetRef.location.nativeElement);

      const el: HTMLElement = this.elementRef.nativeElement;
      const clientRect = el.getBoundingClientRect();

      this.isInTransit = true;
      this.width = el.offsetWidth + 'px';
      this.height = el.offsetHeight + 'px';
      this.top = clientRect.top + 'px';
      this.left = clientRect.left + 'px';

      this.createShadow(this.elementRef.nativeElement);
    });
  }

  private handleDrag() {
    return this.draggableService.dragEvents.subscribe(delta => {
      this.transform = 'translate(' + delta.x + 'px, ' + delta.y + 'px)';
    });
  }

  private handleDragEnter(): Subscription {
    return this.draggableService.dragEnterEvents.subscribe(e => {
      this.insertShadow(
        e.target.elementRef.nativeElement,
        e.draggable.componetRef.location.nativeElement,
        e.draggable.shadow
      );
    });
  }

  private handleDragLeave(): Subscription {
    return this.draggableService.dragLeaveEvents.subscribe(e => {
      this.removeShadow(e.target.elementRef.nativeElement, e.draggable.shadow);
    });
  }

  private handleDragEnd() {
    return this.draggableService.dragEndEvents.subscribe(e => {
      this.removeShadow(e.target.elementRef.nativeElement, e.draggable.shadow);
      this.moveDraggable(e);

      this.isInTransit = false;
      this.transform = null;
      this.width = null;
      this.height = null;
      this.top = null;
      this.left = null;
      this.shadow = null;
    });
  }

  private createShadow(el: HTMLElement): void {
    this.shadow = el.cloneNode(true) as HTMLElement;
    this.renderer.addClass(this.shadow, 'shadow');
  }

  private insertShadow(droppable: HTMLElement, draggable: HTMLElement, shadow: HTMLElement) {
    if (draggable.parentElement === droppable) {
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

  private moveDraggable(e: DragEvent): void {
    // remove draggable from current host
    const i = e.draggable.container.viewContainerRef.indexOf(e.draggable.componetRef.hostView);
    if (i > -1) {
      e.draggable.container.viewContainerRef.detach(i);
    }
    // add draggable to new host
    e.target.viewContainerRef.insert(e.draggable.componetRef.hostView);
    e.draggable.container = e.target;
  }

  private clearSelection(draggable: HTMLElement): void {
    const selection = window.getSelection();
    if (selection.containsNode(draggable, true)) {
      selection.empty();
    }
  }
}
