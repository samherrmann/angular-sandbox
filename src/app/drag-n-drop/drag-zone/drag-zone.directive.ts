import { Directive, HostListener, OnInit } from '@angular/core';
import { DragNDropService } from '../drag-n-drop.service';

@Directive({
  selector: '[appDragZone]'
})
export class DragZoneDirective implements OnInit {

  constructor(private dragAndDropService: DragNDropService) { }

  ngOnInit() { }

  @HostListener('pointermove', ['$event'])
  pointerMove(e: PointerEvent) {
    if (this.dragAndDropService.isActive()) {
      this.dragAndDropService.emitDrag(e);
    }
  }

  @HostListener('pointerup', ['$event'])
  pointerUp(e: PointerEvent) {
    if (this.dragAndDropService.isActive()) {
      this.dragAndDropService.emitDragEnd(e);
    }
  }
}
