import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SwipeEvent } from './swipe-event';

@Injectable()
export class SwipeZoneService {

  private readonly _isActive = new BehaviorSubject(false);
  readonly isActive = this._isActive.asObservable();

  private readonly _swipeStartEvents = new Subject<SwipeEvent>();
  readonly swipeStartEvents = this._swipeStartEvents.asObservable();

  private readonly _swipeEvents = new Subject<SwipeEvent>();
  readonly swipeEvents = this._swipeEvents.asObservable();

  private readonly _swipeEndEvents = new Subject<SwipeEvent>();
  readonly swipeEndEvents = this._swipeEndEvents.asObservable();

  constructor() {}

  swipeStart(e: PointerEvent): void {
    this._isActive.next(true);
    this._swipeStartEvents.next(new SwipeEvent('swipestart', e));
  }

  swipe(e: PointerEvent): void {
    if (this._isActive.getValue()) {
      this._swipeEvents.next(new SwipeEvent('swipe', e));
    }
  }

  swipeEnd(e: PointerEvent): void {
    this._isActive.next(false);
    this._swipeEndEvents.next(new SwipeEvent('swipeend', e));
  }
}
