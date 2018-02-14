import { DroppableComponent } from './droppable/droppable.component';

export class Location {
  constructor(
    public droppable: DroppableComponent,
    public index: number) { }
}
