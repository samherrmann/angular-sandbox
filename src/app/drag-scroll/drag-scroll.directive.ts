import { Directive, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DragScrollService } from './drag-scroll.service';

@Directive({
  selector: '[appDragScroll]',
  providers: [
    DragScrollService
  ]
})
export class DragScrollDirective implements OnInit, OnDestroy {

  private scrollPercentage = 0.02;

  private subscriptions: Subscription[] = [];

  constructor(private dragScrollService: DragScrollService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.dragScrollService.register(this.elementRef.nativeElement);
    this.subscriptions.push(
      this.handleScrollUpEvent(),
      this.handleScrollDownEvent()
    );
  }

  private handleScrollUpEvent(): Subscription {
    return this.dragScrollService.scrollUpEvents.subscribe(e => {
      this.scrollUp(this.elementRef.nativeElement);
    });
  }

  private handleScrollDownEvent(): Subscription {
    return this.dragScrollService.scrollDownEvents.subscribe(e => {
      this.scrollDown(this.elementRef.nativeElement);
    });
  }

  private scrollUp(el: HTMLElement): void {
    el.scrollTop -= this.scrollPercentage * el.clientHeight;
  }

  private scrollDown(el: HTMLElement): void {
    el.scrollTop += this.scrollPercentage * el.clientHeight;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
