import { Directive, OnInit, TemplateRef, Input, SkipSelf } from '@angular/core';
import { DraggableFactoryService } from './draggable/draggable-factory.service';
import { DroppableComponent } from './droppable/droppable.component';

@Directive({
  selector: '[dndTemplate]'
})
export class TemplateDirective implements OnInit {

  @Input()
  dndTemplateOf: any[];

  @Input()
  dndTemplateGroup = '';

  constructor(private templateRef: TemplateRef<any>,
    private draggableFactoryService: DraggableFactoryService,
    @SkipSelf() private droppable: DroppableComponent) {
  }

  ngOnInit() {
    if (this.dndTemplateOf instanceof Array) {
      this.dndTemplateOf.forEach((item, i) => {
        const ctx = {
          $implicit: item,
          index: i
        };

        this.draggableFactoryService.create<any>(
          this.dndTemplateGroup + '-' + i,
          this.templateRef,
          this.droppable,
          ctx
        );
      });

    } else {
      console.error('dndTemplateOf is not of type Array');
    }
  }
}
