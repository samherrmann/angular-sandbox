import { Directive, HostListener } from '@angular/core';
import { SwipeZoneService } from './swipe-zone.service';

@Directive({
  selector: '[appSwipeZone]',
  providers: [
    SwipeZoneService
  ]
})
export class SwipeZoneDirective {

  constructor(private swipeService: SwipeZoneService) { }

  @HostListener('pointerdown', ['$event'])
  pointerDown(e: PointerEvent) {
    this.swipeService.swipeStart(e);
  }

  @HostListener('pointermove', ['$event'])
  pointerMove(e: PointerEvent) {
    this.swipeService.swipe(e);
  }

  @HostListener('pointerup', ['$event'])
  pointerUp(e: PointerEvent) {
    this.swipeService.swipeEnd(e);
  }
}
