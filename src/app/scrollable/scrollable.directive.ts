import { Directive, OnInit, ElementRef, OnDestroy, Renderer2, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ScrollableService } from './scrollable.service';

@Directive({
  selector: '[appScrollable]',
  providers: [
    ScrollableService
  ]
})
export class ScrollableDirective implements OnInit, OnDestroy {

  @Input()
  scrollPercentage = 0.02;

  private subscriptions: Subscription[] = [];

  constructor(private renderer: Renderer2,
    private dragScrollService: ScrollableService,
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
    const scrollTop = el.scrollTop - this.scrollPercentage * el.clientHeight;
    this.renderer.setProperty(el, 'scrollTop', scrollTop);
  }

  private scrollDown(el: HTMLElement): void {
    const scrollTop = el.scrollTop + this.scrollPercentage * el.clientHeight;
    this.renderer.setProperty(el, 'scrollTop', scrollTop);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
