import { DraggableComponent } from '../draggable/draggable.component';
import { Location } from './location';

/**
 * A cache for draggables.
 */
export class Cache {
  constructor(private _draggable: DraggableComponent = null,
              private _location: Location = null) {}

  /**
   * Caches a draggable
   * @param draggable The draggable to cache.
   * @param location The location of the draggable to cache.
   */
  set(draggable: DraggableComponent, location: Location): void {
    this._draggable = draggable;
    this._location = location;
  }

  /**
   * Returns the draggable that is currently cached.
   * Retruns `null` if the chache is empty.
   */
  draggable(): DraggableComponent {
    return this._draggable;
  }

  /**
   * Returns the original location of the cached
   * draggable before it was moved and cached.
   * Returns `null` if the cahce is empty.
   */
  location(): Location {
    return this._location;
  }

  /**
   * Clears the cache.
   */
  clear(): void {
    this._draggable = null;
    this._location = null;
  }

  /**
   * Returns `true` is the cache is empty. Returns `false` otherswise.
   */
  isEmpty(): boolean {
    return this._draggable === null && this._location === null;
  }
}
