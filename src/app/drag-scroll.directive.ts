import { Directive, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { DragAndDropService } from './drag-and-drop.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[appDragScroll]'
})
export class DragScrollDirective implements OnInit, OnDestroy {

  private readonly SCROLL_PERCENTAGE = 0.02;

  private subscriptions: Subscription[] = [];

  constructor(private dragAndDropService: DragAndDropService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.subscriptions.push(
      this.handleDragEvent()
    );
  }

  private handleDragEvent(): Subscription {
    const el = <HTMLElement>this.elementRef.nativeElement;

    return this.dragAndDropService.events.pipe(
      filter(e => e.type === 'drag')
    ).subscribe(e => {
      const rect: ClientRect = this.elementRef.nativeElement.getBoundingClientRect();

      if (this.isInScrollUpZone(e.pointerEvent, rect)) {
        el.scrollTop -= this.SCROLL_PERCENTAGE * rect.height;

      } else if (this.isInScrollDownZone(e.pointerEvent, rect)) {
        el.scrollTop += this.SCROLL_PERCENTAGE * rect.height;
      }
    });
  }

  private isInScrollUpZone(e: PointerEvent, rect: ClientRect): boolean {
    return e.clientX >= rect.left && e.clientX <= (rect.left + rect.width) &&
    e.clientY >= rect.top && e.clientY <= (rect.top + 0.25 * rect.height);
  }

  private isInScrollDownZone(e: PointerEvent, rect: ClientRect): boolean {
    return e.clientX >= rect.left && e.clientX <= (rect.left + rect.width) &&
    e.clientY >= (rect.top + 0.75 * rect.height) && e.clientY <= (rect.top + rect.height);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
