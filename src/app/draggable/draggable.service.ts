import { Injectable, OnDestroy, RendererFactory2 } from '@angular/core';
import { DragAndDropService } from '../drag-and-drop.service';
import { Observable } from 'rxjs/Observable';
import { DragEvent, DragEventType } from '../drag-event';
import { filter } from 'rxjs/operators';
import { DraggableComponent } from './draggable.component';
import { Subscription } from 'rxjs/Subscription';
import { Coordinate2D } from '../coordinate-2d';

@Injectable()
export class DraggableService implements OnDestroy {

  private dragStartPoint: Coordinate2D;

  private subscriptions: Subscription[] = [];

  private readonly renderer = this.rendererFactory.createRenderer(null, null);

  constructor(private dragAndDropService: DragAndDropService,
    private rendererFactory: RendererFactory2) { }

  register(draggable: DraggableComponent): void {
    this.subscriptions.push(
      this.handleDragStarEvents(draggable),
      this.handleDragEvents(draggable),
      this.handleDragEndEvents(draggable)
    );
  }

  private handleDragStarEvents(draggable: DraggableComponent): Subscription {
    return this.events(draggable, 'dragstart').subscribe(e => {
      this.dragStartPoint = {
        x: e.pointerEvent.clientX,
        y: e.pointerEvent.clientY
      };
      this.setTransitStyles(draggable.componetRef.location.nativeElement);
    });
  }

  private handleDragEvents(draggable: DraggableComponent): Subscription {
    return this.events(draggable, 'drag').subscribe(e => {
      this.move(
        e.draggable.componetRef.location.nativeElement,
        e.pointerEvent.clientX,
        e.pointerEvent.clientY
      );
    });
  }

  private handleDragEndEvents(draggable: DraggableComponent): Subscription {
    return this.events(draggable, 'dragend').subscribe(e => {
      this.removeTransientStyles(e.draggable.componetRef.location.nativeElement);
    });
  }

  private events(draggable: DraggableComponent, type?: DragEventType): Observable<DragEvent> {
    return this.dragAndDropService.events(type).pipe(
      filter(e => e.draggable === draggable)
    );
  }

  private move(draggable: HTMLElement, x: number, y: number): void {
    const delta: Coordinate2D = {
      x: x - this.dragStartPoint.x,
      y: y - this.dragStartPoint.y
    };
    this.renderer.setStyle(draggable, 'transform', 'translate(' + delta.x + 'px, ' + delta.y + 'px)');
  }

  private setTransitStyles(draggable: HTMLElement): void {
    const clientRect = draggable.getBoundingClientRect();
    this.renderer.setStyle(draggable, 'width', draggable.offsetWidth + 'px');
    this.renderer.setStyle(draggable, 'height', draggable.offsetHeight + 'px');
    this.renderer.setStyle(draggable, 'position', 'fixed');
    this.renderer.setStyle(draggable, 'top', clientRect.top + 'px');
    this.renderer.setStyle(draggable, 'left', clientRect.left + 'px');
  }

  private removeTransientStyles(draggable: HTMLElement): void {
    this.renderer.removeAttribute(draggable, 'style');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
