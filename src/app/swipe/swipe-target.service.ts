import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SwipeEvent } from './swipe-event';
import { SwipeZoneService } from './swipe-zone.service';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class SwipeTargetService implements OnDestroy {

  private readonly _swipeOverEvents = new Subject<SwipeEvent>();
  readonly swipeOverEvents = this._swipeOverEvents.asObservable();

  private readonly _swipeEnterEvents = new Subject<SwipeEvent>();
  readonly swipeEnterEvents = this._swipeEnterEvents.asObservable();

  private readonly _swipeLeaveEvents = new Subject<SwipeEvent>();
  readonly swipeLeaveEvents = this._swipeLeaveEvents.asObservable();

  private subs: Subscription[] = [];

  private wasLastEventOverTarget = false;

  constructor(private swipeZoneService: SwipeZoneService) {}

  register(target: HTMLElement): void {
    this.subs.push(
      this.handleSwipeStartEvents(target),
      this.handleSwipeEvents(target),
      this.handleSwipeEndEvents(target)
    );
  }

  private handleSwipeStartEvents(target: HTMLElement): Subscription {
    return this.swipeZoneService.swipeStartEvents.subscribe(e => {
      if (this.isPointerOverTarget(e.pointerEvent, target)) {
        this._swipeEnterEvents.next(new SwipeEvent('swipenter', e.pointerEvent));
        this.wasLastEventOverTarget = true;
      }
    });
  }

  private handleSwipeEvents(target: HTMLElement): Subscription {
    return this.swipeZoneService.swipeEvents.subscribe(e => {
      if (this.isPointerOverTarget(e.pointerEvent, target)) {
        this._swipeOverEvents.next(new SwipeEvent('swipeover', e.pointerEvent));

        if (!this.wasLastEventOverTarget) {
          this._swipeEnterEvents.next(new SwipeEvent('swipenter', e.pointerEvent));
        }
        this.wasLastEventOverTarget = true;

      } else {
        if (this.wasLastEventOverTarget) {
          this._swipeLeaveEvents.next(new SwipeEvent('swipeleave', e.pointerEvent));
        }
        this.wasLastEventOverTarget = false;
      }
    });
  }

  private handleSwipeEndEvents(target: HTMLElement): Subscription {
    return this.swipeZoneService.swipeEndEvents.subscribe(e => {
      if (this.wasLastEventOverTarget) {
        this._swipeLeaveEvents.next(new SwipeEvent('swipeleave', e.pointerEvent));
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
