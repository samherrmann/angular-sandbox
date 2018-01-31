import { Directive, HostListener, SkipSelf, Renderer2, ElementRef, OnInit } from '@angular/core';
import { DragNDropService } from './drag-n-drop.service';
import { DraggableComponent } from './draggable/draggable.component';

@Directive({
  selector: '[appDragHandle]'
})
export class DragHandleDirective implements OnInit {

  constructor(private dragAndDropService: DragNDropService,
    @SkipSelf() private draggable: DraggableComponent,
    private renderer: Renderer2,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'touch-action', 'none');
  }

  @HostListener('pointerdown', ['$event'])
  pointerDown(e: PointerEvent) {
    this.dragAndDropService.dragStart(e, this.draggable);
  }
}
