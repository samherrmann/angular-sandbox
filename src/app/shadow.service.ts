import { Injectable, Renderer2 } from '@angular/core';
import { Shadow } from './shadow';
import { DraggableComponent } from './draggable/draggable.component';
export { Shadow };

@Injectable()
export class ShadowService {

  create(renderer: Renderer2, draggable: DraggableComponent, e: PointerEvent): Shadow {
    return new Shadow(
      renderer,
      draggable.componetRef.location.nativeElement,
      e
    );
  }
}
