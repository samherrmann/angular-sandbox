import { Directive, HostListener, SkipSelf, Renderer2, ElementRef, OnInit } from '@angular/core';
import { DragAndDropService } from './drag-and-drop.service';
import { DraggableComponent } from './draggable/draggable.component';
import { SwipeZoneService } from '../swipe/swipe-zone.service';

@Directive({
  selector: '[appDragHandle]'
})
export class DragHandleDirective implements OnInit {

  constructor(private dragAndDropService: DragAndDropService,
    @SkipSelf() private draggable: DraggableComponent,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private swipeService: SwipeZoneService) { }

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'touch-action', 'none');
  }

  @HostListener('pointerdown', ['$event'])
  pointerDown(e: PointerEvent) {
    // If the user releases the pointer while being outside of the
    // swipe-zone, the swipe-end event is not triggered. When
    // the user returns the pointer to the swipe-zone and resumes
    // the swipe, we need to ignore the `pointerdown` event.
    if (!this.swipeService.isActive && e.isPrimary) {
      this.swipeService.emitSwipeStart(e);
      this.dragAndDropService.emitDragStart(e, this.draggable);
    }
  }
}
