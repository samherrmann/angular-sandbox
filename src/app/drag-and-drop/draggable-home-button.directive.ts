import { Directive, OnInit, OnDestroy, SkipSelf, TemplateRef, ViewContainerRef, EmbeddedViewRef, Renderer2 } from '@angular/core';
import { DraggableComponent } from './draggable/draggable.component';
import { DraggableService } from './draggable/draggable.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[appDraggableHomeButton]'
})
export class DraggableHomeButtonDirective implements OnInit, OnDestroy {

  private viewRef: EmbeddedViewRef<DraggableHomeButtonDirective> = null;

  private removeClickListener: () => void;

  private sub: Subscription;

  constructor(@SkipSelf() private draggable: DraggableComponent,
    private draggableService: DraggableService,
    private templateRef: TemplateRef<DraggableHomeButtonDirective>,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2) {}

  ngOnInit() {
    this.sub = this.draggableService.insert.subscribe(e => {
      if (!this.doesViewExist() && !this.isAtOrigin()) {
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
    return this.draggable.droppable === this.draggable.origin();
  }

  private onClick(): void {
    this.draggable.detatch();
    if (this.draggable.origin()) {
      this.draggable.insert(this.draggable.origin());
    } else {
      this.draggable.remove();
    }
  }
}
