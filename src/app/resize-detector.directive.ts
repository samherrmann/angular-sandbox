import { Directive, ElementRef } from '@angular/core';
declare let elementResizeDetectorMaker: any;

@Directive({
  selector: '[appResizeDetector]'
})
export class ResizeDetectorDirective {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    var erdUltraFast = elementResizeDetectorMaker({
      strategy: "scroll"
    });
    erdUltraFast.listenTo(this.elementRef.nativeElement, (el) => {
      console.log(el.offsetWidth);
    });
  }
}
