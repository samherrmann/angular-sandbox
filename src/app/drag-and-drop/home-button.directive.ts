import { Directive, OnInit, OnDestroy, SkipSelf, TemplateRef, ViewContainerRef, EmbeddedViewRef, Renderer2 } from '@angular/core';
import { DraggableComponent } from './draggable/draggable.component';
import { DraggableService } from './draggable/draggable.service';
import { Subscription } from 'rxjs/Subscription';
import { DragAndDropService } from './drag-and-drop.service';

/**
 * This structural directive can be applied on an element, most likely
 * a button, that when clicked will return the parent
 * {@link DraggableComponent} back to its origin (the droppable within
 * which the draggable was created). The directive will also remove the
 * host element from the DOM when the parent draggable is located at its
 * origin.
 *
 * ### Example
 * ```
 * <button *dndOriginControl>
 *   Home
 * </button>
 * ```
 */
@Directive({
  selector: '[dndOriginControl]'
})
export class OriginControlDirective implements OnInit, OnDestroy {

  private viewRef: EmbeddedViewRef<OriginControlDirective> = null;

  private removeClickListener: () => void;

  private sub: Subscription;

  constructor(@SkipSelf() private draggable: DraggableComponent,
    private draggableService: DraggableService,
    private dragAndDropService: DragAndDropService,
    private templateRef: TemplateRef<OriginControlDirective>,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2) {}

  ngOnInit() {
    if (!this.isAtOrigin() && this.hasAnOrigin()) {
      this.createView();
    }

    this.sub = this.draggableService.insert.subscribe(e => {
      if (!this.doesViewExist() && !this.isAtOrigin() && this.hasAnOrigin()) {
        this.createView();

      } else if (this.doesViewExist() && this.isAtOrigin()) {
        this.removeView();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private createView(): void {
    this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
    this.removeClickListener = this.renderer.listen(this.viewRef.rootNodes[0], 'click', () => this.onClick());
  }

  private removeView(): void {
    this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.viewRef));
    this.removeClickListener();
  }

  private doesViewExist(): boolean {
    return this.viewRef !== null && !this.viewRef.destroyed;
  }

  private isAtOrigin(): boolean {
    return this.dragAndDropService.droppables.get(this.draggable.origin()) === this.draggable.droppable;
  }

  private hasAnOrigin(): boolean {
    return this.draggable.origin().length > 0;
  }

  private onClick(): void {
    const origin = this.dragAndDropService.droppables.get(this.draggable.origin());
    if (origin) {
      this.draggable.detatch();
      this.draggable.insert(origin);
    } else {
      this.draggable.remove();
    }
  }
}
