import { Directive, ElementRef, OnInit } from '@angular/core';
import { SwipeZoneService } from './swipe-zone.service';

@Directive({
  selector: '[appSwipeZone]',
  providers: [
    SwipeZoneService
  ]
})
export class SwipeZoneDirective implements OnInit {

  constructor(private swipeService: SwipeZoneService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.swipeService.register(this.elementRef.nativeElement);
  }
}
