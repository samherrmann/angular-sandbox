import { Directive, HostListener, OnInit } from '@angular/core';
import { DragNDropService } from './drag-n-drop.service';
import { SwipeZoneDirective } from '../swipe/swipe-zone.directive';
import { SwipeZoneService } from '../swipe/swipe-zone.service';

@Directive({
  selector: '[appDragZone]',
  providers: [
    SwipeZoneService
  ]
})
export class DragZoneDirective extends SwipeZoneDirective implements OnInit {

  constructor(private dragAndDropService: DragNDropService,
    swipeService: SwipeZoneService) {
    super(swipeService);
  }

  ngOnInit() { }

  @HostListener('pointermove', ['$event'])
  pointerMove(e: PointerEvent) {
    super.pointerMove(e);

    if (this.dragAndDropService.isActive()) {
      this.dragAndDropService.emitDrag(e);
    }
  }

  @HostListener('pointerup', ['$event'])
  pointerUp(e: PointerEvent) {
    super.pointerUp(e);

    if (this.dragAndDropService.isActive()) {
      this.dragAndDropService.emitDragEnd(e);
    }
  }
}
