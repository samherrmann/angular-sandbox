import { Injectable, OnDestroy } from '@angular/core';
import { DragNDropService } from '../drag-n-drop.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { DragEvent } from '../drag-event';

@Injectable()
export class ScrollableService implements OnDestroy {

  private rect: ClientRect;

  private readonly _scrollUpEvents = new Subject<DragEvent>();
  readonly scrollUpEvents = this._scrollUpEvents.asObservable();

  private readonly _scrollDownEvents = new Subject<DragEvent>();
  readonly scrollDownEvents = this._scrollDownEvents.asObservable();

  private readonly SCROLL_ZONE_PERCENTAGE = 0.25;

  private subscriptions: Subscription[] = [];

  constructor(private dragAndDropService: DragNDropService, ) { }

  register(scrollable: HTMLElement): void {
    this.subscriptions.push(
      this.handleDragStartEvent(scrollable),
      this.handleDragEvent()
    );
  }

  private handleDragStartEvent(el: HTMLElement): Subscription {
    return this.dragAndDropService.dragStart.subscribe(e => {
      this.rect = el.getBoundingClientRect();
    });
  }

  private handleDragEvent(): Subscription {
    return this.dragAndDropService.drag.subscribe(e => {
      if (this.isInScrollUpZone(e.pointerEvent, this.rect)) {
        this._scrollUpEvents.next(e);

      } else if (this.isInScrollDownZone(e.pointerEvent, this.rect)) {
        this._scrollDownEvents.next(e);
      }
    });
  }

  private isInScrollUpZone(e: PointerEvent, target: ClientRect): boolean {
    return e.clientX >= target.left &&
    e.clientX <= (target.left + target.width) &&
    e.clientY >= target.top &&
    e.clientY <= (target.top + this.SCROLL_ZONE_PERCENTAGE * target.height);
  }

  private isInScrollDownZone(e: PointerEvent, target: ClientRect): boolean {
    return e.clientX >= target.left &&
    e.clientX <= (target.left + target.width) &&
    e.clientY >= (target.top + (1 - this.SCROLL_ZONE_PERCENTAGE) * target.height) &&
    e.clientY <= (target.top + target.height);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
