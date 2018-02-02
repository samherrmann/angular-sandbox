import { Directive, Output, ElementRef, OnInit } from '@angular/core';
import { SwipeTargetService } from './swipe-target.service';

@Directive({
  selector: '[appSwipeTarget]',
  providers: [
    SwipeTargetService
  ]
})
export class SwipeTargetDirective implements OnInit {

  @Output()
  swipeEnter = this.swipeTargetService.swipeEnterEvents;

  @Output()
  swipeLeave = this.swipeTargetService.swipeLeaveEvents;

  @Output()
  swipeOver = this.swipeTargetService.swipeOverEvents;

  constructor(private swipeTargetService: SwipeTargetService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.swipeTargetService.register(this.elementRef.nativeElement);
  }
}
