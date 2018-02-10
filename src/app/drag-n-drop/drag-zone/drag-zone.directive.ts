import { Directive, OnInit, OnDestroy } from '@angular/core';
import { DragNDropService } from '../drag-n-drop.service';
import { Subscription } from 'rxjs/Subscription';
import { SwipeZoneService } from '../../swipe/swipe-zone.service';

@Directive({
  selector: '[appDragZone]'
})
export class DragZoneDirective implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  constructor(private dragAndDropService: DragNDropService,
    private swipeService: SwipeZoneService) { }

  ngOnInit() {
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
