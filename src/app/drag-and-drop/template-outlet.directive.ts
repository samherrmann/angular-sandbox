import { Directive, OnInit, TemplateRef, Input, SkipSelf } from '@angular/core';
import { DraggableFactoryService } from './draggable/draggable-factory.service';
import { DroppableComponent } from './droppable/droppable.component';

@Directive({
  selector: '[dndTemplateOutlet]'
})
export class TemplateOutletDirective implements OnInit {

  @Input()
  dndTemplateOutlet: TemplateRef<any>;

  @Input()
  dndTemplateOutletContext: any;

  @Input()
  dndTemplateOutletId = '';

  constructor(private draggableFactoryService: DraggableFactoryService,
    @SkipSelf() private droppable: DroppableComponent) {
  }

  ngOnInit() {
    this.draggableFactoryService.create<any>(
      this.dndTemplateOutletId,
      this.dndTemplateOutlet,
      this.droppable,
      this.dndTemplateOutletContext
    );
  }
}
