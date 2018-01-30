import { Directive, HostListener, OnInit, OnDestroy } from '@angular/core';
import { DragAndDropService } from './drag-and-drop.service';
import { Subscription } from 'rxjs/Subscription';
import { ShadowService, Shadow } from './shadow.service';

@Directive({
  selector: '[appDraggableArea]'
})
export class DragAreaDirective implements OnInit, OnDestroy {

  private isActive = false;

  private shadow: Shadow;

  private subscriptions: Subscription[] = [];

  constructor(private dragAndDropService: DragAndDropService,
    private shadowService: ShadowService) { }

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
      this.shadow = this.shadowService.create(e.draggable, e.pointerEvent);
    });
  }

  private handleDragEvents(): Subscription {
    return this.dragAndDropService.events('drag').subscribe(e => {
      this.shadow.move(e.pointerEvent);
    });
  }

  private handleDragEndEvents(): Subscription {
    return this.dragAndDropService.events('dragend').subscribe(e => {
      this.shadow.remove();
    });
  }
}
