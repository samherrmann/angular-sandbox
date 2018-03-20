import { Directive, HostListener } from '@angular/core';
import { SwipeZoneService } from './swipe-zone.service';

@Directive({
  selector: '[swipeHandle]'
})
export class SwipeHandleDirective {

  constructor(private swipeService: SwipeZoneService) { }

  @HostListener('pointerdown', ['$event'])
  pointerDown(e: PointerEvent) {
    // If the user releases the pointer while being outside of the
    // swipe-zone, the swipe-end event is not triggered. When
    // the user returns the pointer to the swipe-zone and resumes
    // the swipe, we need to ignore the `pointerdown` event.
    if (!this.swipeService.isActive && e.isPrimary) {
      this.swipeService.emitSwipeStart(e);
    }
  }
}
