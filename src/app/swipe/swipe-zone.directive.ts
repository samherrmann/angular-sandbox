import { Directive, HostListener, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { SwipeZoneService } from './swipe-zone.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[appSwipeZone]',
  providers: [
    SwipeZoneService
  ]
})
export class SwipeZoneDirective implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  constructor(private swipeService: SwipeZoneService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.subs.push(this.handlePointerMove());
  }

  @HostListener('pointerdown', ['$event'])
  pointerDown(e: PointerEvent) {
    this.swipeService.emitSwipeStart(e);
  }

  @HostListener('pointerup', ['$event'])
  pointerUp(e: PointerEvent) {
    this.swipeService.emitSwipeEnd(e);
  }

  private handlePointerMove(): Subscription {
    return this.swipeService.listenWhenActive<PointerEvent>(
      this.elementRef.nativeElement,
      'pointermove'
    ).subscribe(e => {
      this.swipeService.emitSwipe(e);
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
