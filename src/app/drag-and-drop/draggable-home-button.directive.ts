import { Directive, SkipSelf, HostListener } from '@angular/core';
import { DraggableComponent } from './draggable/draggable.component';

@Directive({
  selector: '[appDraggableHomeButton]'
})
export class DraggableHomeButtonDirective {

  constructor(@SkipSelf() private draggable: DraggableComponent) {}

  @HostListener('click')
  click() {
    if (this.draggable.droppable !== this.draggable.origin()) {
      this.draggable.detatch();
      if (this.draggable.origin()) {
        this.draggable.insert(this.draggable.origin());
      } else {
        this.draggable.remove();
      }
    }
  }
}
