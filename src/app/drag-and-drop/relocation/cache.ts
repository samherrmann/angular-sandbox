import { DraggableComponent } from '../draggable/draggable.component';
import { Location } from './location';

export class Cache {
  constructor(
    private _draggable: DraggableComponent = null,
    private _location: Location = null) { }

  set(draggable: DraggableComponent, location: Location): void {
    this._draggable = draggable;
    this._location = location;
  }

  draggable(): DraggableComponent {
    return this._draggable;
  }

  location(): Location {
    return this._location;
  }

  clear(): void {
    this._draggable = null;
    this._location = null;
  }

  isEmpty(): boolean {
    return this._draggable === null && this._location === null;
  }
}
