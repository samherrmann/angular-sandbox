import { Directive, HostListener, SkipSelf } from '@angular/core';
import { DragNDropService } from './drag-n-drop.service';
import { DraggableComponent } from './draggable/draggable.component';

@Directive({
  selector: '[appDragHandle]'
})
export class DragHandleDirective {

  constructor(private dragAndDropService: DragNDropService,
    @SkipSelf() private draggable: DraggableComponent) { }


  @HostListener('pointerdown', ['$event'])
  pointerDown(e: PointerEvent) {
    this.dragAndDropService.dragStart(e, this.draggable);
  }
}
