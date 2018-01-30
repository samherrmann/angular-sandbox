import { Directive, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { DragAndDropService } from '../drag-and-drop.service';
import { Subscription } from 'rxjs/Subscription';
import { DragScrollService } from './drag-scroll.service';

@Directive({
  selector: '[appDragScroll]'
})
export class DragScrollDirective implements OnInit, OnDestroy {

  private rect: ClientRect;

  private subscriptions: Subscription[] = [];

  constructor(private dragAndDropService: DragAndDropService,
    private dragScrollService: DragScrollService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.subscriptions.push(
      this.handleDragStartEvent(),
      this.handleDragEvent()
    );
  }

  private handleDragStartEvent(): Subscription {
    return this.dragAndDropService.events('dragstart').subscribe(e => {
      this.rect = this.elementRef.nativeElement.getBoundingClientRect();
    });
  }

  private handleDragEvent(): Subscription {
    return this.dragAndDropService.events('drag').subscribe(e => {
      if (this.dragScrollService.isInScrollUpZone(e.pointerEvent, this.rect)) {
        this.dragScrollService.scrollUp(this.elementRef.nativeElement);

      } else if (this.dragScrollService.isInScrollDownZone(e.pointerEvent, this.rect)) {
        this.dragScrollService.scrollDown(this.elementRef.nativeElement);
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
