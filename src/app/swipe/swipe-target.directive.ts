import { Directive, Output, ElementRef, OnInit } from '@angular/core';
import { SwipeTargetService } from './swipe-target.service';

@Directive({
  selector: '[swipeEnter], [swipeOver], [swipeLeave]',
  providers: [
    SwipeTargetService
  ]
})
export class SwipeTargetDirective implements OnInit {

  @Output()
  swipeEnter = this.swipeTargetService.swipeEnter;

  @Output()
  swipeLeave = this.swipeTargetService.swipeLeave;

  @Output()
  swipeOver = this.swipeTargetService.swipeOver;

  constructor(private swipeTargetService: SwipeTargetService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.swipeTargetService.register(this.elementRef.nativeElement);
  }
}
