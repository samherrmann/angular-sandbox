import { Coordinate2D } from './coordinate-2d';
import { DraggableComponent } from './draggable/draggable.component';
import { ElementRef } from '@angular/core';

export class Ghost {

  private ghost: HTMLElement;

  private dragStartPoint: Coordinate2D;

  constructor(private dragArea: HTMLElement,
    draggable: HTMLElement,
    e: PointerEvent) {

    this.initDragStartPoint(e);
    this.ghost = draggable.cloneNode(true) as HTMLElement;
    this.styleGhost(draggable);
    dragArea.appendChild(this.ghost);
  }

  move(e: PointerEvent): void {
    const delta: Coordinate2D = {
      x: e.clientX - this.dragStartPoint.x,
      y: e.clientY - this.dragStartPoint.y
    };
    this.ghost.style.transform = 'translate(' + delta.x + 'px, ' + delta.y + 'px)';
  }

  remove(): void {
    this.dragArea.removeChild(this.ghost);
  }

  private styleGhost(draggable: HTMLElement): void {
    const clientRect = draggable.getBoundingClientRect();
    const style = this.ghost.style;

    style.width = draggable.offsetWidth + 'px';
    style.height = draggable.offsetHeight + 'px';
    style.position = 'fixed';
    style.top = clientRect.top + 'px';
    style.left = clientRect.left + 'px';
  }

  private initDragStartPoint(e: PointerEvent): void {
    this.dragStartPoint = {
      x: e.clientX,
      y: e.clientY
    };
  }
}
