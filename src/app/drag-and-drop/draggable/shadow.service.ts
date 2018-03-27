import { Injectable, Renderer2 } from '@angular/core';

/**
 * This service provides access to the draggable shadow.
 *
 * What is a shadow? In most drag and drop libraries when a draggable is being
 * dragged, a clone is created that follows the pointer, usually refered to as
 * the "ghost". Meanwhile, the real component jumps from one drop location to
 * another as the pointer hovers over the drop location. This approach does not
 * work nicelyfor live components. If the draggable contains a video, for
 * example, then the ghost does not show the current state of the video but the
 * video's initial state. That may be misleading to users as it may make them
 * believe that the video was reset when they started dragging the draggable
 * that contains the video. With the shadow approach, the ghost is the real
 * component that follows the pointer and the shadow is a clone that jumps from
 * droppable to droppable. The limitation of the clone not representing the true
 * state of the draggable is still exists with this approach. The benefit in
 * this case though is that the ghost can be styled to a solid colour, hiding
 * the content, without creating unexpected surprises for the users.
 */
@Injectable()
export class ShadowService {

  private shadow: HTMLElement[] = [];

  constructor(private renderer: Renderer2) { }

  /**
   * Clones the content and adds the clone to the end of the list of children of
   * the provided parent.
   */
  insert(parent: HTMLElement, content: HTMLElement[]): void {
    this.create(content);
    this.shadow.forEach(el => {
      this.renderer.appendChild(parent, el);
    });
  }

  /**
   * Removes the ghost.
   */
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
