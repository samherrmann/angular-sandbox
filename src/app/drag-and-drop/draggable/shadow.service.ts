import { Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class ShadowService {

  private shadow: HTMLElement[] = [];

  constructor(private renderer: Renderer2) { }

  insert(parent: HTMLElement, content: HTMLElement[]): void {
    this.create(content);
    this.shadow.forEach(el => {
      this.renderer.appendChild(parent, el);
    });
  }

  remove(): void {
    this.shadow.forEach(el => {
      this.renderer.removeChild(el.parentNode, el);
    });
    this.shadow = [];
  }

  private create(content: HTMLElement[]): void {
    this.shadow = [];
    content.forEach(el => {
      const clone = el.cloneNode(true) as HTMLElement;
      this.shadow.push(clone);
      this.renderer.addClass(clone, 'shadow');
    });
  }
}
