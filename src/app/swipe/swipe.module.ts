import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwipeZoneDirective } from './swipe-zone.directive';
import { SwipeTargetDirective } from './swipe-target.directive';
import { SwipeZoneService } from './swipe-zone.service';
import { SwipeHandleDirective } from './swipe-handle.directive';

/**
 * The swipe module provides the ability to fire consistent pointer events
 * when moving in, over, and out of a hit area using different pointing
 * devices.
 *
 * The native `pointerenter`, `pointerover` (or `pointermove`), and
 * `pointerleave` events behave differently when using a mouse versus using
 * a touch screen. The reason for the difference in behaviour is that touch
 * screens do not support the `hover` state. When using a device with a
 * mouse, which does support the `hover` state, the different pointer events
 * are fired based on where the mouse is hovering. When the mouse is hovering
 * into a hit area, that hit area will fire the `pointerenter` event. The hit
 * area will then fire `pointermove` events while the mouse is hovering over
 * that hit area and until the mouse leaves the hit area. When the mouse
 * leaves the hit area, the `pointerleave` event is triggered. With the use of
 * the swipe module, the same behaviour is simulated on devices that do not
 * support 'hover' such as touch screens.
 *
 * ### Example:
 * The following example demonstrates the use of the swipe directives:
 * ```html
 * <div swipeZone>
 *   <div swipeHandle></div>
 *
 *   <div swipeEnter="onPointerEnter($event)"
 *        swipeOver="onPointerOver($event)"
 *        swipeleave="onPointerLeave($event)">
 *   </div>
 * </div>
 * ```
 * See each respective directive for further documentation. The backbone of the swipe
 * directives are the {@link SwipeZoneService} and the {@link SwipeTargetService}. You
 * can inject those services in your code to interact with the swipe module
 * programmatically.
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SwipeZoneDirective,
    SwipeTargetDirective,
    SwipeHandleDirective
  ],
  exports: [
    SwipeZoneDirective,
    SwipeTargetDirective,
    SwipeHandleDirective
  ],
  providers: [
    SwipeZoneService
  ]
})
export class SwipeModule { }
