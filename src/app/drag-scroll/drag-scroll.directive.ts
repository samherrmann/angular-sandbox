import { Directive, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { DragAndDropService } from '../drag-and-drop.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { DragScrollService } from './drag-scroll.service';

@Directive({
  selector: '[appDragScroll]'
})
export class DragScrollDirective implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(private dragAndDropService: DragAndDropService,
    private dragScrollService: DragScrollService,
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

      if (this.dragScrollService.isInScrollUpZone(e.pointerEvent, rect)) {
        this.dragScrollService.scrollUp(el);

      } else if (this.dragScrollService.isInScrollDownZone(e.pointerEvent, rect)) {
        this.dragScrollService.scrollDown(el);
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
