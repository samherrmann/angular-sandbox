import { Directive, ElementRef } from '@angular/core';
import { ResizeSensor } from 'css-element-queries'

@Directive({
  selector: '[appResizeSensor]'
})
export class ResizeSensorDirective {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    new ResizeSensor(this.elementRef.nativeElement, () => {
      console.log(this.elementRef.nativeElement.offsetWidth);
    });
  }
}
