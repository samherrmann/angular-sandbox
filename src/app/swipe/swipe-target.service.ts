import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SwipeEvent } from './swipe-event';
import { SwipeZoneService } from './swipe-zone.service';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class SwipeTargetService implements OnDestroy {

  private readonly _swipeOver = new Subject<SwipeEvent>();
  readonly swipeOver = this._swipeOver.asObservable();

  private readonly _swipeEnter = new Subject<SwipeEvent>();
  readonly swipeEnter = this._swipeEnter.asObservable();

  private readonly _swipeLeave = new Subject<SwipeEvent>();
  readonly swipeLeave = this._swipeLeave.asObservable();

  private subs: Subscription[] = [];

  private wasLastEventOverTarget = false;

  constructor(private swipeZoneService: SwipeZoneService) {}

  register(target: HTMLElement): void {
    this.subs.push(
      this.handleSwipeStart(target),
      this.handleSwipe(target),
      this.handleSwipeEnd(target)
    );
  }

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

  private handleSwipeEnd(target: HTMLElement): Subscription {
    return this.swipeZoneService.swipeEnd.subscribe(e => {
      if (this.wasLastEventOverTarget) {
        this._swipeLeave.next(new SwipeEvent('swipeleave', e.pointerEvent));
        this.wasLastEventOverTarget = false;
      }
    });
  }

  private isPointerOverTarget(e: PointerEvent, target: HTMLElement): boolean {
    const el: ClientRect = target.getBoundingClientRect();
    return e.clientX >= el.left && e.clientX <= (el.left + el.width) &&
    e.clientY >= el.top && e.clientY <= (el.top + el.height);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
