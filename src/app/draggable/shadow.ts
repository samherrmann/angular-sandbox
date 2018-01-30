import { Renderer2 } from '@angular/core';

export class Shadow {

  private readonly shadow: HTMLElement;

  constructor(private renderer: Renderer2,
    private draggable: HTMLElement) {

    this.shadow = draggable.cloneNode(true) as HTMLElement;
    this.renderer.insertBefore(draggable.parentElement, this.shadow, this.draggable);
  }

  remove(): void {
    this.renderer.removeChild(this.shadow.parentElement, this.shadow);
  }
}
