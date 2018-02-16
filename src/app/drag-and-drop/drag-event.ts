import { DraggableComponent } from './draggable/draggable.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';

export class RemoveEvent {
  constructor(public type: DragEventType,
    public draggable: DraggableComponent) {}
}

export class InsertEvent extends RemoveEvent {}

export class DragEvent extends RemoveEvent {

  constructor(
    type: DragEventType,
    public pointerEvent: PointerEvent,
    draggable: DraggableComponent
  ) {
    super(type, draggable);
  }
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

export class DragEnterEvent extends DragOverEvent {}
export class DragLeaveEvent extends DragOverEvent {}

export type DragEventType =
  'drag' |
  'dragstart' |
  'dragend' |
  'dragenter' |
  'dragleave' |
  'dragover' |
  'remove' |
  'insert';
