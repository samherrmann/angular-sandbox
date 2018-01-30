import { Directive, HostListener, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { DragAndDropService } from './drag-and-drop.service';
import { Subscription } from 'rxjs/Subscription';
import { GhostService } from './ghost.service';
import { Ghost } from './ghost';

@Directive({
  selector: '[appDraggableArea]'
})
export class DragAreaDirective implements OnInit, OnDestroy {

  private isActive = false;

  private ghost: Ghost;

  private subscriptions: Subscription[] = [];

  constructor(private dragAndDropService: DragAndDropService,
    private elementRef: ElementRef,
    private ghostService: GhostService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.dragAndDropService.isActive.subscribe(isActive => {
        this.isActive = isActive;
      }),
      this.handleDragStarEvents(),
      this.handleDragEvents(),
      this.handleDragEndEvents()
    );
  }

  @HostListener('pointermove', ['$event'])
  pointerMove(e: PointerEvent) {
    if (this.isActive) {
      this.dragAndDropService.drag(e);
    }
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
      this.ghost = this.ghostService.create(this.elementRef, e.draggable, e.pointerEvent);
    });
  }

  private handleDragEvents(): Subscription {
    return this.dragAndDropService.events('drag').subscribe(e => {
      this.ghost.move(e.pointerEvent);
    });
  }

  private handleDragEndEvents(): Subscription {
    return this.dragAndDropService.events('dragend').subscribe(e => {
      this.ghost.remove();
    });
  }
}
