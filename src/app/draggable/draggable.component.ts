import { Component, OnInit, OnDestroy, HostListener, HostBinding, ElementRef, Renderer2,
  ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import {  DraggableService } from './draggable.service';
import { Subscription } from 'rxjs/Subscription';
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
export class DraggableComponent implements OnInit, OnDestroy {

  @ViewChild('vc', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

  componetRef: ComponentRef<DraggableComponent>;

  container: DroppableComponent;

  private subscriptions: Subscription[] = [];

  constructor(private draggableService: DraggableService,
    private dragAndDropService: DragAndDropService,
    private elementRef: ElementRef,
    private renderer: Renderer2) {
  }

  ngOnInit() {
    // this.draggableService.register(this);
    // this.subscriptions.push(
    //   this.handleDragEvents(),
    //   this.handleDragEndEvents()
    // );
  }

  @HostListener('pointerdown', ['$event'])
  pointerDown(e: PointerEvent) {
    this.dragAndDropService.dragStart(e, this);
  }

  ngOnDestroy() {
    // this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // private handleDragEvents(): Subscription {
  //   return this.draggableService.dragEvents(this)
  //     .subscribe(e => {
  //       this.renderer.setStyle(
  //         this.elementRef.nativeElement,
  //         'transform',
  //         'translate(' + e.x + 'px, ' + e.y + 'px)'
  //       );
  //     });
  // }

  // private handleDragEndEvents(): Subscription {
  //   return this.draggableService.dragEndEvents(this)
  //   .subscribe(e => {
  //     this.renderer.removeStyle(this.elementRef.nativeElement, 'transform');
  //   });
  // }
}
