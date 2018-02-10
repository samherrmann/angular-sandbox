import { Directive, Output, ElementRef, OnInit } from '@angular/core';
import { SwipeTargetService } from './swipe-target.service';

@Directive({
  selector: '[appSwipeEnter], [appSwipeOver], [appSwipeLeave]',
  providers: [
    SwipeTargetService
  ]
})
export class SwipeTargetDirective implements OnInit {

  @Output()
  appSwipeEnter = this.swipeTargetService.swipeEnter;

  @Output()
  appSwipeLeave = this.swipeTargetService.swipeLeave;

  @Output()
  appSwipeOver = this.swipeTargetService.swipeOver;

  constructor(private swipeTargetService: SwipeTargetService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.swipeTargetService.register(this.elementRef.nativeElement);
  }
}
