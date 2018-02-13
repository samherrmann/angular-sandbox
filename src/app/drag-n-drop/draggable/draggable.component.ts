import { Component, OnInit, OnDestroy, ComponentRef, ViewChild, ViewContainerRef,
  HostBinding, ElementRef, Renderer2 } from '@angular/core';
import {  DraggableService } from './draggable.service';
import { DroppableComponent } from '../droppable/droppable.component';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

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

  @HostBinding('style.width')
  width: string;

  @HostBinding('style.height')
  height: string;

  componetRef: ComponentRef<DraggableComponent>;

  container: DroppableComponent;

  shadow: HTMLElement;

  content: ComponentRef<any>;

  target: Observable<boolean>;

  private subs: Subscription[] = [];

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef,
    private draggableService: DraggableService) { }

  ngOnInit() {
    this.draggableService.register(this);
    this.subs.push(
      this.handleDragStart(),
      this.handleDrag(),
      this.handleDragEnter(),
      this.handleDragEnd()
    );
    this.target = this.draggableService.target;
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private handleDragStart(): Subscription {
    return this.draggableService.dragStart.subscribe(e => {
      const el: HTMLElement = this.elementRef.nativeElement;
      this.width = el.offsetWidth + 'px';
      this.height = el.offsetHeight + 'px';

      this.clearSelection(e.draggable.componetRef.location.nativeElement);
      this.removeShadow(e.draggable.shadow);
      this.createShadow(this.content.location.nativeElement);
      this.insertShadow(
        e.draggable.componetRef.location.nativeElement,
        e.draggable.shadow
      );

      // TODO:  Investigate removing the timeout and not causing
      //        a flicker in a list of draggables. The current
      //        value of 64ms was determined experimentally.
      setTimeout(() => {
        this.height = null;
        this.width = null;
      }, 64);
    });
  }

  private handleDrag(): Subscription {
    return this.draggableService.drag.subscribe(e => {

    });
  }

  private handleDragEnter(): Subscription {
    return this.draggableService.dragEnter.subscribe(e => {

    });
  }

  private handleDragEnd(): Subscription {
    return this.draggableService.dragEnd.subscribe(e => {
      this.removeShadow(e.draggable.shadow);
    });
  }

  private createShadow(el: HTMLElement): void {
    this.shadow = el.cloneNode(true) as HTMLElement;
    this.renderer.addClass(this.shadow, 'shadow');
  }

  private insertShadow(draggable: HTMLElement, shadow: HTMLElement) {
    this.renderer.appendChild(draggable, shadow);
  }

  private removeShadow(shadow: HTMLElement) {
    if (shadow) {
      this.renderer.removeChild(shadow.parentNode, shadow);
      this.shadow = null;
    }
  }

  // private moveDraggable(e: DragEvent): void {
  //   // remove draggable from current host
  //   const i = e.draggable.container.viewContainerRef.indexOf(e.draggable.componetRef.hostView);
  //   if (i > -1) {
  //     e.draggable.container.viewContainerRef.detach(i);
  //   }
  //   // add draggable to new host
  //   e.target.viewContainerRef.insert(e.draggable.componetRef.hostView);
  //   e.draggable.container = e.target;
  // }

  private clearSelection(draggable: HTMLElement): void {
    const selection = window.getSelection();
    if (selection.containsNode(draggable, true)) {
      selection.empty();
    }
  }
}
