import { DraggableComponent } from '../draggable/draggable.component';
import { Location } from '../location';

export class Cache {
  constructor(
    public draggable: DraggableComponent,
    public location: Location) { }
}
