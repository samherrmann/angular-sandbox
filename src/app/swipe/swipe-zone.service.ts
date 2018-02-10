import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SwipeEvent } from './swipe-event';
import { Observable } from 'rxjs/Observable';
import { filter, flatMap, takeUntil } from 'rxjs/operators';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class SwipeZoneService implements OnDestroy {

  private readonly _active = new BehaviorSubject(false);
  readonly active = this._active.asObservable();

  private readonly _swipeStart = new Subject<SwipeEvent>();
  readonly swipeStart = this._swipeStart.asObservable();

  private readonly _swipe = new Subject<SwipeEvent>();
  readonly swipe = this._swipe.asObservable();

  private readonly _swipeEnd = new Subject<SwipeEvent>();
  readonly swipeEnd = this._swipeEnd.asObservable();

  private subs: Subscription[] = [];

  constructor() {}

  register(el: HTMLElement) {
    this.subs.push(
      this.handlePointerMove(el),
      this.handlePointerUp(el)
    );
  }

  emitSwipeStart(e: PointerEvent): void {
    this._active.next(true);
    this._swipeStart.next(new SwipeEvent('swipestart', e));
  }

  emitSwipe(e: PointerEvent): void {
    this._swipe.next(new SwipeEvent('swipe', e));
  }

  emitSwipeEnd(e: PointerEvent): void {
    this._active.next(false);
    this._swipeEnd.next(new SwipeEvent('swipeend', e));
  }

  listenWhenActive<T>(el: EventTarget, eventName: string): Observable<T> {
    return this.active.pipe(
      filter(e => e === true),
      flatMap(() => {
        return fromEvent<T>(el, eventName).pipe(
          takeUntil(this.active.pipe(filter(e => e === false)))
        );
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private handlePointerMove(el: HTMLElement): Subscription {
    return this.listenWhenActive<PointerEvent>(el, 'pointermove').subscribe(e => {
      this.emitSwipe(e);
    });
  }

  private handlePointerUp(el: HTMLElement): Subscription {
    return this.listenWhenActive<PointerEvent>(el, 'pointerup').subscribe(e => {
      this.emitSwipeEnd(e);
    });
  }
}
