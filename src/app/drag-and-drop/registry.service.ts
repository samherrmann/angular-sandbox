import { Injectable } from '@angular/core';
import { DroppableComponent } from './droppable/droppable.component';

@Injectable()
export class RegistryService {

  private droppables = new Map<string, DroppableComponent>();

  constructor() { }

  register(name: string, droppable: DroppableComponent): void {
    if (this.droppables.has(name)) {
      console.error('Drop container name "' + name + '" already exists.');
      return;
    }
    this.droppables.set(name, droppable);
  }

  unregister(droppable: DroppableComponent): void {
    for (const [key, value] of Array.from(this.droppables)) {
      if (value === droppable) {
        this.droppables.delete(key);
        return;
      }
    }
  }

  get(name: string): DroppableComponent {
    return this.droppables.get(name);
  }
}
