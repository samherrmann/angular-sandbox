import { Directive, HostListener, OnInit, OnDestroy} from '@angular/core';
import { DragAndDropService } from './drag-and-drop.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[appDraggableArea]'
})
export class DragAreaDirective implements OnInit, OnDestroy {

  private isActive = false;

  private subscription: Subscription;

  constructor(private dragAndDropService: DragAndDropService) { }

  ngOnInit() {
    this.subscription = this.dragAndDropService.isActive.subscribe(isActive => {
      this.isActive = isActive;
    });
  }

  @HostListener('pointermove', ['$event'])
  pointerMove(e: PointerEvent) {
    if (this.isActive) {
      this.dragAndDropService.drag(e);
    }
  }

  @HostListener('pointerup', ['$event'])
  pointerUp(e: PointerEvent) {
    this.dragAndDropService.dragEnd(e);
  }

  @HostListener('pointerleave', ['$event'])
  pointerLeave(e: PointerEvent) {
    this.dragAndDropService.dragEnd(e);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
