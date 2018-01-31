import { Directive, HostListener, OnInit, OnDestroy } from '@angular/core';
import { DragNDropService } from './drag-n-drop.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[appDraggableArea]'
})
export class DragAreaDirective implements OnInit, OnDestroy {

  private isActive = false;

  private subscriptions: Subscription[] = [];

  constructor(private dragAndDropService: DragNDropService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.dragAndDropService.isActive.subscribe(isActive => {
        this.isActive = isActive;
      })
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
}
