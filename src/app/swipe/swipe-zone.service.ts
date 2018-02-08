import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SwipeEvent } from './swipe-event';

@Injectable()
export class SwipeZoneService {

  private readonly _isActive = new BehaviorSubject(false);
  readonly isActive = this._isActive.asObservable();

  private readonly _swipeStart = new Subject<SwipeEvent>();
  readonly swipeStart = this._swipeStart.asObservable();

  private readonly _swipe = new Subject<SwipeEvent>();
  readonly swipe = this._swipe.asObservable();

  private readonly _swipeEnd = new Subject<SwipeEvent>();
  readonly swipeEnd = this._swipeEnd.asObservable();

  constructor() {}

  emitSwipeStart(e: PointerEvent): void {
    this._isActive.next(true);
    this._swipeStart.next(new SwipeEvent('swipestart', e));
  }

  emitSwipe(e: PointerEvent): void {
    if (this._isActive.getValue()) {
      this._swipe.next(new SwipeEvent('swipe', e));
    }
  }

  emitSwipeEnd(e: PointerEvent): void {
    this._isActive.next(false);
    this._swipeEnd.next(new SwipeEvent('swipeend', e));
  }
}
