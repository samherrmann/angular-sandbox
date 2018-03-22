import { DraggableComponent } from '../draggable/draggable.component';
import { DroppableComponent } from '../droppable/droppable.component';

/**
 * Represents an event object for relocating
 * a draggable.
 */
export class RelocationEvent {
  constructor(
    public draggable: DraggableComponent,
    public droppable: DroppableComponent,
    public index: number
  ) { }
}
