import { Directive, OnInit, OnDestroy, SkipSelf, TemplateRef, ViewContainerRef, EmbeddedViewRef, Renderer2 } from '@angular/core';
import { DraggableComponent } from './draggable/draggable.component';
import { DraggableService } from './draggable/draggable.service';
import { Subscription } from 'rxjs/Subscription';
import { DragAndDropService } from './drag-and-drop.service';

@Directive({
  selector: '[dndHomeButton]'
})
export class HomeButtonDirective implements OnInit, OnDestroy {

  private viewRef: EmbeddedViewRef<HomeButtonDirective> = null;

  private removeClickListener: () => void;

  private sub: Subscription;

  constructor(@SkipSelf() private draggable: DraggableComponent,
    private draggableService: DraggableService,
    private dragAndDropService: DragAndDropService,
    private templateRef: TemplateRef<HomeButtonDirective>,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2) {}

  ngOnInit() {
    if (!this.isAtOrigin() && this.doesHaveAnOrigin()) {
      this.createView();
    }

    this.sub = this.draggableService.insert.subscribe(e => {
      if (!this.doesViewExist() && !this.isAtOrigin() && this.doesHaveAnOrigin()) {
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
    return this.dragAndDropService.droppables.get(this.draggable.origin) === this.draggable.droppable;
  }

  private doesHaveAnOrigin(): boolean {
    return this.draggable.origin.length > 0;
  }

  private onClick(): void {
    const origin = this.dragAndDropService.droppables.get(this.draggable.origin);
    if (origin) {
      this.draggable.detatch();
      this.draggable.insert(origin);
    } else {
      this.draggable.remove();
    }
  }
}
