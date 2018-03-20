import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SwipeEvent } from './swipe-event';
import { SwipeZoneService } from './swipe-zone.service';
import { Subscription } from 'rxjs/Subscription';

/**
 * This service provides access to observe the `swipeenter`,
 * `swipeover` and `swipeleave` events of the registered
 * target element. This service is designed to be provided
 * to the target directive/component.
 */
@Injectable()
export class SwipeTargetService implements OnDestroy {

  private readonly _swipeOver = new Subject<SwipeEvent>();

  /**
   * Observable that emits a {@link SwipeEvent} on swipe over.
   */
  readonly swipeOver = this._swipeOver.asObservable();

  private readonly _swipeEnter = new Subject<SwipeEvent>();

  /**
   * Observable that emits a {@link SwipeEvent} on swipe enter.
   */
  readonly swipeEnter = this._swipeEnter.asObservable();

  private readonly _swipeLeave = new Subject<SwipeEvent>();

  /**
   * Observable that emits a {@link SwipeEvent} on swipe leave.
   */
  readonly swipeLeave = this._swipeLeave.asObservable();

  private subs: Subscription[] = [];

  private wasLastEventOverTarget = false;

  constructor(private swipeZoneService: SwipeZoneService) {}

  /**
   * Register a HTML element that defines a swipe target.
   */
  register(target: HTMLElement): void {
    this.subs.push(
      this.handleSwipeStart(target),
      this.handleSwipe(target),
      this.handleSwipeEnd(target)
    );
  }

  /**
   * Subscribes to `swipestart` events and emits a `swipeenter` event if
   * the `swipestart` event was fired within the swipe target.
   * @param target The swipe target HTML element.
   */
  private handleSwipeStart(target: HTMLElement): Subscription {
    return this.swipeZoneService.swipeStart.subscribe(e => {
      if (this.isPointerOverTarget(e.pointerEvent, target)) {
        // we need to emit the `swipeenter` event at the end of the
        // javascript execution stack to ensure that all `swipestart`
        // observers receive `swipestart` before `swipeenter`.
        setTimeout(() => {
          this._swipeEnter.next(new SwipeEvent('swipeenter', e.pointerEvent));
          this.wasLastEventOverTarget = true;
        });
      }
    });
  }

  /**
   * Subscribes to `swipe` events and emits a `swipeenter`, `swipeover`, or
   * `swipeleave` events for the given swipe target when appropriate.
   * @param target The swipe target HTML element.
   */
  private handleSwipe(target: HTMLElement): Subscription {
    return this.swipeZoneService.swipe.subscribe(e => {
      if (this.isPointerOverTarget(e.pointerEvent, target)) {
        this._swipeOver.next(new SwipeEvent('swipeover', e.pointerEvent));

        if (!this.wasLastEventOverTarget) {
          this._swipeEnter.next(new SwipeEvent('swipeenter', e.pointerEvent));
        }
        this.wasLastEventOverTarget = true;

      } else {
        if (this.wasLastEventOverTarget) {
          this._swipeLeave.next(new SwipeEvent('swipeleave', e.pointerEvent));
        }
        this.wasLastEventOverTarget = false;
      }
    });
  }

  /**
   * Subscribes to `swipeend` events and emits a `swipeleave` event if
   * the `swipeend` was fired within the swipe target.
   * @param target The swipe target HTML element.
   */
  private handleSwipeEnd(target: HTMLElement): Subscription {
    return this.swipeZoneService.swipeEnd.subscribe(e => {
      if (this.wasLastEventOverTarget) {
        this._swipeLeave.next(new SwipeEvent('swipeleave', e.pointerEvent));
        this.wasLastEventOverTarget = false;
      }
    });
  }

  /**
   * Returns true if the pointer event is over the target element.
   * Returns false otherwise.
   * @param e The pointer event to check if it's over the target element.
   * @param target The target HTML element.
   */
  private isPointerOverTarget(e: PointerEvent, target: HTMLElement): boolean {
    const el: ClientRect = target.getBoundingClientRect();
    return e.clientX >= el.left && e.clientX < (el.left + el.width) &&
    e.clientY >= el.top && e.clientY < (el.top + el.height) &&
    el.height > 0 && el.width > 0;
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
