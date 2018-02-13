import { DraggableComponent } from './draggable/draggable.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';

export class DragEvent {

  constructor(
    public type: DragEventType,
    public pointerEvent: PointerEvent,
    public draggable: DraggableComponent
  ) { }
}

export class DragOverEvent extends DragEvent {
  constructor(
    type: DragEventType,
    pointerEvent: PointerEvent,
    draggable: DraggableComponent,
    public dropZone: DropZoneComponent
  ) {
    super(type, pointerEvent, draggable);
  }
}

export class DragEnterEvent extends DragOverEvent { }
export class DragLeaveEvent extends DragOverEvent { }

export type DragEventType =
  'drag' |
  'dragstart' |
  'dragend' |
  'dragenter' |
  'dragexit' |
  'dragleave' |
  'dragover' |
  'drop';
