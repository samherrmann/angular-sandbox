import { Coordinate2D } from './coordinate-2d';

export class Shadow {

  private readonly shadow: HTMLElement;

  private readonly dragStartPoint: Coordinate2D = {
    x: this.e.clientX,
    y: this.e.clientY
  };

  constructor(private draggable: HTMLElement, private e: PointerEvent) {

    this.shadow = draggable.cloneNode(true) as HTMLElement;
    this.setTransitStyles(draggable);
    draggable.parentElement.insertBefore(this.shadow, draggable);
  }

  move(e: PointerEvent): void {
    const delta: Coordinate2D = {
      x: e.clientX - this.dragStartPoint.x,
      y: e.clientY - this.dragStartPoint.y
    };
    this.draggable.style.transform = 'translate(' + delta.x + 'px, ' + delta.y + 'px)';
  }

  remove(): void {
    this.shadow.parentElement.removeChild(this.shadow);
    this.draggable.removeAttribute('style');
  }

  private setTransitStyles(draggable: HTMLElement): void {
    const clientRect = draggable.getBoundingClientRect();
    const s = draggable.style;

    s.width = draggable.offsetWidth + 'px';
    s.height = draggable.offsetHeight + 'px';
    s.position = 'fixed';
    s.top = clientRect.top + 'px';
    s.left = clientRect.left + 'px';
  }
}
