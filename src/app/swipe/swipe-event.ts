
export class SwipeEvent {
  constructor(public type: SwipeEventType,
              public pointerEvent: PointerEvent) { }
}

/**
 * Swipe event types.
 * - swipe:       Fired upon a `pointermove` event within the swipe zone
 *                while a swipe is active.
 * - swipestart:  Fired upon a `pointerdown` event on the swipe handle.
 *                A `swipestart` event activates a swipe.
 * - swipeend:    Fired upon a `pointerup` event within the swipe zone.
 *                A `swipeend` event deactivates a swipe.
 * - swipeenter:  Fired upon a pointer entering a swipe target while a
 *                swipe is active.
 * - swipeleave:  Fired upon a pointer leaving a swipe target while a
 *                swipe is active.
 * - swipeover:   Fired upon a `pointermove` event within a swipe target.
 */
export type SwipeEventType =
  'swipe' |
  'swipestart' |
  'swipeend' |
  'swipeenter' |
  'swipeleave' |
  'swipeover';
