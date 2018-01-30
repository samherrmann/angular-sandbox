import { Injectable } from '@angular/core';
import { Shadow } from './shadow';
import { DraggableComponent } from './draggable/draggable.component';
export { Shadow };

@Injectable()
export class ShadowService {

  create(draggable: DraggableComponent, e: PointerEvent): Shadow {
    return new Shadow(
      draggable.componetRef.location.nativeElement,
      e
    );
  }
}
