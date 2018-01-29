import { Injectable } from '@angular/core';

@Injectable()
export class DragScrollService {

  private scrollPercentage = 0.02;

  constructor() { }

  setScrollPercentage(value: number): void {
    this.scrollPercentage = value;
  }

  isInScrollUpZone(e: PointerEvent, target: ClientRect): boolean {
    return e.clientX >= target.left && e.clientX <= (target.left + target.width) &&
    e.clientY >= target.top && e.clientY <= (target.top + 0.25 * target.height);
  }

  isInScrollDownZone(e: PointerEvent, target: ClientRect): boolean {
    return e.clientX >= target.left && e.clientX <= (target.left + target.width) &&
    e.clientY >= (target.top + 0.75 * target.height) && e.clientY <= (target.top + target.height);
  }

  scrollUp(el: HTMLElement): void {
    el.scrollTop -= this.scrollPercentage * el.clientHeight;
  }

  scrollDown(el: HTMLElement): void {
    el.scrollTop += this.scrollPercentage * el.clientHeight;
  }
}
