import { Component, HostListener, OnInit, OnDestroy,
  ComponentRef, ViewChild, ViewContainerRef, HostBinding, ElementRef } from '@angular/core';
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

  constructor(private elementRef: ElementRef,
    private dragAndDropService: DragAndDropService,
    private draggableService: DraggableService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.handleDragStart(),
      this.handleDrag(),
      this.handleDragEnd()
    );
  }

  @HostListener('pointerdown', ['$event'])
  pointerDown(e: PointerEvent) {
    this.dragAndDropService.dragStart(e, this);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private handleDragStart() {
    return this.draggableService.dragStartEvents(this).subscribe(e => {
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
    return this.draggableService.dragEvents(this).subscribe(delta => {
      this.transform = 'translate(' + delta.x + 'px, ' + delta.y + 'px)';
    });
  }

  private handleDragEnd() {
    return this.draggableService.dragEndEvents(this).subscribe(delta => {
      this.removeShadow();

      this.isInTransit = false;
      this.transform = null;
      this.width = null;
      this.height = null;
      this.top = null;
      this.left = null;
    });
  }

  private createShadow(el: HTMLElement): void {
    this.shadow = el.cloneNode(true) as HTMLElement;
  }

  private removeShadow(): void {
    this.shadow = null;
  }
}
