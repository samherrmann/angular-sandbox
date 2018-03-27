import { DroppableComponent } from '../droppable/droppable.component';

/**
 * Represents the location of a draggable.
 */
export class Location {
  constructor(public droppable: DroppableComponent,
              public index: number) {}
}
