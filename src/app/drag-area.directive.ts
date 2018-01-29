import { Directive, HostListener, OnInit, OnDestroy, ElementRef, Renderer2} from '@angular/core';
import { DragAndDropService } from './drag-and-drop.service';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';
import { DraggableComponent } from './draggable/draggable.component';
import { Coordinate2D } from './draggable/coordinate-2d';
import { DragEvent } from './drag-event';

@Directive({
  selector: '[appDraggableArea]'
})
export class DragAreaDirective implements OnInit, OnDestroy {

  private isActive = false;

  private ghost: HTMLElement;

  private dragStartPoint: Coordinate2D;

  private subscriptions: Subscription[] = [];

  constructor(private dragAndDropService: DragAndDropService,
    private elementRef: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.subscriptions.push(
      this.dragAndDropService.isActive.subscribe(isActive => {
        this.isActive = isActive;
      }),
      this.handleDragStarEvents(),
      this.handleDragEvents(),
      this.handledragEndEvents()
    );
  }

  @HostListener('pointermove', ['$event'])
  pointerMove(e: PointerEvent) {
    if (this.isActive) {
      this.dragAndDropService.drag(e);
    }
    e.stopPropagation();
    return false;
  }

  @HostListener('pointerup', ['$event'])
  pointerUp(e: PointerEvent) {
    if (this.isActive) {
      this.dragAndDropService.dragEnd(e);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private handleDragStarEvents(): Subscription {
    return this.dragAndDropService.events('dragstart').subscribe(e => {
      this.renderer.setStyle(this.elementRef.nativeElement, 'user-select', 'none');

      this.dragStartPoint = {
        x: e.pointerEvent.clientX,
        y: e.pointerEvent.clientY
      };
      this.createGhostImage(e.draggable);
    });
  }

  private handleDragEvents(): Subscription {
    return this.dragAndDropService.events('drag').subscribe(e => {
      this.moveGhost(e.pointerEvent);
    });
  }

  private handledragEndEvents(): Subscription {
    return this.dragAndDropService.events('dragend').subscribe(e => {
      this.removeGhost();
      this.renderer.removeStyle(this.elementRef.nativeElement, 'user-select');
    });
  }

  private createGhostImage(draggable: DraggableComponent): void {
    const container = <HTMLElement>this.elementRef.nativeElement;
    const el = <HTMLElement>draggable.componetRef.location.nativeElement;
    const clone = <HTMLElement>el.cloneNode(true);
    const clientRect = el.getBoundingClientRect();

    clone.style.width = el.offsetWidth + 'px';
    clone.style.height = el.offsetHeight + 'px';
    clone.style.position = 'fixed';
    clone.style.top = clientRect.top + 'px';
    clone.style.left = clientRect.left + 'px';
    this.ghost = container.appendChild(clone);
  }

  private moveGhost(e: PointerEvent): void {
    const deltaX = e.clientX - this.dragStartPoint.x;
    const deltaY = e.clientY - this.dragStartPoint.y;
    this.ghost.style.transform = 'translate(' + deltaX + 'px, ' + deltaY + 'px)';
  }

  private removeGhost(): void {
    this.elementRef.nativeElement.removeChild(this.ghost);
    this.ghost = undefined;
  }
}
