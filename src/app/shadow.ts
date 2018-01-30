import { Coordinate2D } from './coordinate-2d';
import { Renderer2 } from '@angular/core';

export class Shadow {

  private readonly shadow: HTMLElement;

  private readonly dragStartPoint: Coordinate2D = {
    x: this.e.clientX,
    y: this.e.clientY
  };

  constructor(private renderer: Renderer2,
    private draggable: HTMLElement,
    private e: PointerEvent) {

    this.shadow = draggable.cloneNode(true) as HTMLElement;
    this.setTransitStyles(draggable);
    this.renderer.insertBefore(draggable.parentElement, this.shadow, this.draggable);
  }

  move(e: PointerEvent): void {
    const delta: Coordinate2D = {
      x: e.clientX - this.dragStartPoint.x,
      y: e.clientY - this.dragStartPoint.y
    };
    this.renderer.setStyle(this.draggable, 'transform', 'translate(' + delta.x + 'px, ' + delta.y + 'px)');
  }

  remove(): void {
    this.renderer.removeChild(this.shadow.parentElement, this.shadow);
    this.renderer.removeAttribute(this.draggable, 'style');
  }

  private setTransitStyles(draggable: HTMLElement): void {
    const clientRect = draggable.getBoundingClientRect();
    this.renderer.setStyle(draggable, 'width', draggable.offsetWidth + 'px');
    this.renderer.setStyle(draggable, 'height', draggable.offsetHeight + 'px');
    this.renderer.setStyle(draggable, 'position', 'fixed');
    this.renderer.setStyle(draggable, 'top', clientRect.top + 'px');
    this.renderer.setStyle(draggable, 'left', clientRect.left + 'px');
  }
}
