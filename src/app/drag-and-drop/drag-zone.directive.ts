import { Directive, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { DragAndDropService } from './drag-and-drop.service';
import { Subscription } from 'rxjs/Subscription';
import { SwipeZoneService } from '../swipe/swipe-zone.service';
import { RelocationService } from './relocation/relocation.service';

/**
 * This directive identifies the area within an application that will
 * monitor pointer events when a drag is active. A drag is activated
 * through the {@link DragHandleDirective}. This directive is usually
 * applied on an element that is of equal size as the `<body>` element.
 * Ideally this directive would be added to the `<body>` element, but
 * the `<body>` element is outside of the "Angular world".
 *
 * ### Example
 * This example demonstrates how to make the entire app a drag zone:
 *
 * app.component.html
 * ```
 * <div dndDragZone>
 *  <!-- content -->
 * </div>
 * ```
 *
 * app.component.scss:
 * ```
 * :host,
 * div[dndDragZone] {
 *   display: block;
 *   height: 100%;
 *   width: 100%;
 * }
 * ```
 *
 * Note:  This directive contains some duplication from the {@link SwipeZoneDirective}
 *        due to Angular's limitation of adding a directive to the host element within
 *        a component/directive (see: https://github.com/angular/angular/issues/8785).
 *        One workaround would be to have the {@link DragZoneDirective} extend the
 *        {@link SwipeZoneDirective}, however extending classes does not extend decorators,
 *        i.e. `@Directive`.
 */
@Directive({
  selector: '[dndDragZone]'
})
export class DragZoneDirective implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  constructor(private relocationService: RelocationService,
              private dragAndDropService: DragAndDropService,
              private swipeService: SwipeZoneService,
              private elementRef: ElementRef) { }

  ngOnInit() {
    this.swipeService.register(this.elementRef.nativeElement);
    this.relocationService.init();
    this.subs.push(
      this.handleSwipe(),
      this.handleSwipeEnd()
    );
  }

  private handleSwipe(): Subscription {
    return this.swipeService.swipe.subscribe(e => {
      this.dragAndDropService.emitDrag(e.pointerEvent);
    });
  }

  private handleSwipeEnd(): Subscription {
    return this.swipeService.swipeEnd.subscribe(e => {
      this.dragAndDropService.emitDragEnd(e.pointerEvent);
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
