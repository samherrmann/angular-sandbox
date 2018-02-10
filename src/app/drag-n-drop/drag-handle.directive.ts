import { Directive, HostListener, SkipSelf, Renderer2, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { DragNDropService } from './drag-n-drop.service';
import { DraggableComponent } from './draggable/draggable.component';
import { SwipeZoneService } from '../swipe/swipe-zone.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[appDragHandle]'
})
export class DragHandleDirective implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  constructor(private dragAndDropService: DragNDropService,
    @SkipSelf() private draggable: DraggableComponent,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private swipeService: SwipeZoneService) { }

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'touch-action', 'none');

    this.subs.push(
      this.swipeService.swipeStart.subscribe(e => {
        this.dragAndDropService.emitDragStart(e.pointerEvent, this.draggable);
      })
    );
  }

  @HostListener('pointerdown', ['$event'])
  pointerDown(e: PointerEvent) {
    this.swipeService.emitSwipeStart(e);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
