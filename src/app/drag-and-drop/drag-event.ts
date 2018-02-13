import { DroppableComponent } from './droppable/droppable.component';
import { DraggableComponent } from './draggable/draggable.component';

export class DragEvent {

  constructor(public type: DragEventType,
    public pointerEvent: PointerEvent,
    public draggable: DraggableComponent,
    public target: DroppableComponent) { }
}

export type DragEventType =
  'drag' |
  'dragstart' |
  'dragend' |
  'dragenter' |
  'dragexit' |
  'dragleave' |
  'dragover' |
  'drop';
