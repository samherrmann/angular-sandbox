
export class SwipeEvent {
  constructor(public type: SwipeEventType,
    public pointerEvent: PointerEvent) { }
}

export type SwipeEventType =
  'swipe' |
  'swipestart' |
  'swipeend' |
  'swipenter' |
  'swipeleave' |
  'swipeover';
