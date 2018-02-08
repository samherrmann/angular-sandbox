import { Directive, HostListener, OnInit, OnDestroy } from '@angular/core';
import { DragNDropService } from './drag-n-drop.service';
import { Subscription } from 'rxjs/Subscription';
import { SwipeZoneDirective } from '../swipe/swipe-zone.directive';
import { SwipeZoneService } from '../swipe/swipe-zone.service';

@Directive({
  selector: '[appDragZone]',
  providers: [
    SwipeZoneService
  ]
})
export class DragZoneDirective extends SwipeZoneDirective implements OnInit, OnDestroy {

  private isActive = false;

  private subscriptions: Subscription[] = [];

  constructor(private dragAndDropService: DragNDropService,
    swipeService: SwipeZoneService) {
    super(swipeService);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.dragAndDropService.isActive.subscribe(isActive => {
        this.isActive = isActive;
      })
    );
  }

  @HostListener('pointermove', ['$event'])
  pointerMove(e: PointerEvent) {
    super.pointerMove(e);

    if (this.isActive) {
      this.dragAndDropService.emitDrag(e);
    }
  }

  @HostListener('pointerup', ['$event'])
  pointerUp(e: PointerEvent) {
    super.pointerUp(e);

    if (this.isActive) {
      this.dragAndDropService.emitDragEnd(e);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
