import { Directive, Input, TemplateRef, ViewContainerRef, EmbeddedViewRef, OnInit, OnDestroy } from '@angular/core';
import { CollapseButtonComponent } from './collapse-button/collapse-button.component';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[appCollapsable]'
})
export class CollapsableDirective implements OnInit, OnDestroy {

  @Input('appCollapsable') collapseButton: CollapseButtonComponent;

  private view: EmbeddedViewRef<any>;

  private subscription: Subscription;

  constructor(private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<any>) { }

  ngOnInit() {
    this.subscription = this.collapseButton.collapse().subscribe(isCollapsed => {
      if (!isCollapsed) {
        this.view = this.viewContainerRef.createEmbeddedView(this.templateRef);

      } else if (this.view) {
        this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.view));
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
