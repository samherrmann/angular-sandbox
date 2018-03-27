import { Directive, ElementRef, OnInit } from '@angular/core';
import { SwipeZoneService } from './swipe-zone.service';

/**
 * This directive identifies the area within an application that will
 * monitor pointer events when a swipe is active. A swipe is activated
 * through the {@link SwipeHandleDirective}. This directive is usually
 * applied on an element that is of equal size as the `<body>` element.
 * Ideally this directive would be added to the `<body>` element, but
 * the `<body>` element is outside of the "Angular world".
 *
 * ### Example
 * This example demonstrates how to make the entire app a swipe zone:
 *
 * app.component.html
 * ```
 * <div swipeZone>
 *  <!-- content -->
 * </div>
 * ```
 *
 * app.component.scss:
 * ```
 * :host,
 * div[swipeZone] {
 *   display: block;
 *   height: 100%;
 *   width: 100%;
 * }
 * ```
 */
@Directive({
  selector: '[swipeZone]'
})
export class SwipeZoneDirective implements OnInit {

  constructor(private swipeService: SwipeZoneService,
              private elementRef: ElementRef) { }

  ngOnInit() {
    this.swipeService.register(this.elementRef.nativeElement);
  }
}
