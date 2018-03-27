import { DraggableComponent } from './draggable/draggable.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';

/**
 * Drag event types.
 * - drag:        Fired upon a `swipe` event within the drag zone
 *                while a drag is active.
 * - dragstart:   Fired upon a `pointerdown` event on the drag handle.
 *                A `dragstart` event activates a drag.
 * - dragend:     Fired upon a `swipeend` event within the drag zone.
 *                A `dragend` event deactivates a drag.
 * - dragenter:   Fired upon a `swipeenter` event on a drop zone while
 *                a drag is active.
 * - dragleave:   Fired upon a `swipeleave` event on a drop zone while
 *                a drag is active.
 * - dragover:    Fired upon a `swipe` event within a drop zone.
 * - remove:      Fired when a draggable is removed from a drop zone.
 * - insert:      Fired when a draggable is inserted into a drop zone.
 */
export type DragEventType =
  'drag' |
  'dragstart' |
  'dragend' |
  'dragenter' |
  'dragleave' |
  'dragover' |
  'remove' |
  'insert';

export class RemoveEvent {
  constructor(public type: DragEventType,
              public draggable: DraggableComponent) { }
}

export class InsertEvent extends RemoveEvent { }

export class DragEvent extends RemoveEvent {
  constructor(type: DragEventType,
              public pointerEvent: PointerEvent,
              draggable: DraggableComponent) {
    super(type, draggable);
  }
}

export class DragOverEvent extends DragEvent {
  constructor(type: DragEventType,
              pointerEvent: PointerEvent,
              draggable: DraggableComponent,
              public dropZone: DropZoneComponent) {
    super(type, pointerEvent, draggable);
  }
}

export class DragEnterEvent extends DragOverEvent { }
export class DragLeaveEvent extends DragOverEvent { }
