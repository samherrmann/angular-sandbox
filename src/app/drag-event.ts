import { DroppableComponent } from './droppable/droppable.component';
import { DraggableComponent } from './draggable/draggable.component';

export class DragEvent {

    constructor(public type: DragEventType,
        public target: DraggableComponent | DroppableComponent,
        public pointerEvent: PointerEvent) { }
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
