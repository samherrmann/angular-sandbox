import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

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

  scrollUp() {
    const scrollTop = this.el.scrollTop - this.scrollPercentage * this.el.clientHeight;
    this.renderer.setProperty(this.el, 'scrollTop', scrollTop);
  }

  scrollDown() {
    const scrollTop = this.el.scrollTop + this.scrollPercentage * this.el.clientHeight;
    this.renderer.setProperty(this.el, 'scrollTop', scrollTop);
  }
}
