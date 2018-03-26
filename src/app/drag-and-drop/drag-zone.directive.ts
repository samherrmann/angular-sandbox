import { Directive, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { DragAndDropService } from './drag-and-drop.service';
import { Subscription } from 'rxjs/Subscription';
import { SwipeZoneService } from '../swipe/swipe-zone.service';
import { RelocationService } from './relocation/relocation.service';

@Directive({
  selector: '[dndDragZone]'
})
export class DragZoneDirective implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  constructor(private relocationService: RelocationService,
    private dragAndDropService: DragAndDropService,
    private swipeService: SwipeZoneService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.swipeService.register(this.elementRef.nativeElement);
    this.relocationService.init();
    this.subs.push(
      this.handleSwipe(),
      this.handleSwipeEnd()
    );
  }

  private handleSwipe(): Subscription {
    return this.swipeService.swipe.subscribe(e => {
      this.dragAndDropService.emitDrag(e.pointerEvent);
    });
  }

  private handleSwipeEnd(): Subscription {
    return this.swipeService.swipeEnd.subscribe(e => {
      this.dragAndDropService.emitDragEnd(e.pointerEvent);
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
