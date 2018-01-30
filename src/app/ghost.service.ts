import { Injectable, ElementRef } from '@angular/core';
import { Ghost } from './ghost';
import { DraggableComponent } from './draggable/draggable.component';

@Injectable()
export class GhostService {

  create(dragArea: ElementRef, draggable: DraggableComponent, e: PointerEvent): Ghost {
    return new Ghost(
      draggable.componetRef.location.nativeElement,
      dragArea.nativeElement,
      e
    );
  }
}
