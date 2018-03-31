import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SwipeEvent } from './swipe-event';
import { Observable } from 'rxjs/Observable';
import { filter, flatMap, takeUntil } from 'rxjs/operators';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

/**
 * This service provides access to the `swipestart`, `swipe`
 * and `swipeend` events. Through this service, you can both
 * observe these events and emit them.
 */
@Injectable()
export class SwipeZoneService implements OnDestroy {

  private readonly _active = new BehaviorSubject(false);

  /**
   * Observable that emits true on swipe start and emits
   * false on swipe end.
   */
  readonly active = this._active.asObservable();

  private readonly _swipeStart = new Subject<SwipeEvent>();

  /**
   * Observable that emits a {@link SwipeEvent} on swipe start.
   */
  readonly swipeStart = this._swipeStart.asObservable();

  private readonly _swipe = new Subject<SwipeEvent>();

  /**
   * Observable that emits a {@link SwipeEvent} on swipe.
   */
  readonly swipe = this._swipe.asObservable();

  private readonly _swipeEnd = new Subject<SwipeEvent>();

  /**
   * Observable that emits a {@link SwipeEvent} on swipe end.
   */
  readonly swipeEnd = this._swipeEnd.asObservable();

  private subs: Subscription[] = [];

  constructor() {}

  /**
   * Register the HTML element that defines the swipe zone.
   */
  register(el: HTMLElement) {
    this.subs.push(
      this.handlePointerMove(el),
      this.handlePointerUp(el)
    );
  }

  /**
   * Emit a `swipestart` event.
   * @param e The pointer event to associated with the `swipestart` event.
   */
  emitSwipeStart(e: PointerEvent): void {
    this._active.next(true);
    this._swipeStart.next(new SwipeEvent('swipestart', e));
  }

  /**
   * Emit a `swipe` event.
   * @param e The pointer event to associated with the `swipe` event.
   */
  emitSwipe(e: PointerEvent): void {
    this._swipe.next(new SwipeEvent('swipe', e));
  }

  /**
   * Emit a `swipeend` event.
   * @param e The pointer event to associated with the `swipeend` event.
   */
  emitSwipeEnd(e: PointerEvent): void {
    this._active.next(false);
    this._swipeEnd.next(new SwipeEvent('swipeend', e));
  }

  /**
   * Returns `true` if a swipe is currently active.
   * Returns `false` otherwise.
   */
  isActive(): boolean {
    return this._active.getValue();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  /**
   * Translates `pointermove` events within the swipe zone into `swipe`
   * events when a swipe is active.
   * @param el The swipe zone HTML element.
   */
  private handlePointerMove(el: HTMLElement): Subscription {
    return this.listenWhenActive<PointerEvent>(el, 'pointermove').subscribe(e => {
      e.preventDefault();
      if (e.isPrimary) {
        this.emitSwipe(e);
      }
    });
  }

  /**
   * Translates `pointerup` events within the swipe zone into `swipeend`
   * events when a swipe is active.
   * @param el The swipe zone HTML element.
   */
  private handlePointerUp(el: HTMLElement): Subscription {
    return this.listenWhenActive<PointerEvent>(el, 'pointerup').subscribe(e => {
      if (e.isPrimary) {
        this.emitSwipeEnd(e);
      }
    });
  }

  /**
   * Attaches an event listener to a HTML element when the swipe is active and
   * removes the event listener when the swipe is inactive.
   * @param el The element on which to attach an event listener.
   * @param eventName The name of the event to listen to.
   */
  private listenWhenActive<T>(el: EventTarget, eventName: string): Observable<T> {
    return this.active.pipe(
      filter(e => e === true),
      flatMap(() => {
        return fromEvent<T>(el, eventName).pipe(
          takeUntil(this.active.pipe(filter(e => e === false)))
        );
      })
    );
  }
}
