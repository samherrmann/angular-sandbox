import { Injectable } from '@angular/core';
import { DroppableComponent } from './droppable.component';
import { DragNDropService } from '../drag-n-drop.service';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { DragEvent } from '../drag-event';

@Injectable()
export class DroppableService {

  constructor(private dragAndDropService: DragNDropService) { }

  dragEnter(droppable: DroppableComponent): Observable<DragEvent> {
    return this.dragAndDropService.dragEnter.pipe(
      filter(e => e.target === droppable)
    );
  }

  dragLeave(droppable: DroppableComponent): Observable<DragEvent> {
    return this.dragAndDropService.dragLeave.pipe(
      filter(e => e.target === droppable)
    );
  }

  dragEnd(): Observable<DragEvent> {
    return this.dragAndDropService.dragEnd;
  }
}
