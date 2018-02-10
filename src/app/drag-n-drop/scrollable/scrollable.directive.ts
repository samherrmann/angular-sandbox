import { Directive, ElementRef, Renderer2, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollable]'
})
export class ScrollableDirective {

  @Input()
  scrollPercentage = 0.02;

  private el: HTMLElement;

  constructor(elementRef: ElementRef,
    private renderer: Renderer2) {
    this.el = elementRef.nativeElement;
  }

  @HostListener('wheel', ['$event'])
  mousewheel(e: WheelEvent) {
    this.scroll(e.deltaY);
  }

  scrollUp() {
    this.scroll(-this.scrollPercentage * this.el.clientHeight);
  }

  scrollDown() {
    this.scroll(this.scrollPercentage * this.el.clientHeight);
  }

  private scroll(deltaY?: number) {
    this.renderer.setProperty(this.el, 'scrollTop', this.el.scrollTop += deltaY);
  }
}
