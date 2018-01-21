import { Component, OnInit, HostListener, HostBinding, ElementRef, Renderer2, ComponentRef } from '@angular/core';
import {  DraggableService } from './draggable.service';

@Component({
  selector: 'app-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.scss'],
  providers: [
    DraggableService
  ]
})
export class DraggableComponent implements OnInit {

  isActive = false;

  componetRef: ComponentRef<DraggableComponent>;

  constructor(private draggableService: DraggableService,
    private elementRef: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {}

  @HostListener('pointerdown', ['$event'])
  pointerDown(e: PointerEvent) {
    this.isActive = true;
    this.draggableService.dragStart(e);
  }

  @HostListener('pointerup', ['$event'])
  pointerUp(e: PointerEvent) {
    this.isActive = false;
    this.renderer.removeStyle(this.elementRef.nativeElement, 'transform');
    this.draggableService.drop(e, this);
    this.draggableService.dragEnd(e);
  }

  @HostListener('pointermove', ['$event'])
  pointerEnter(e: PointerEvent) {
    if (this.isActive) {
      const delta = this.draggableService.drag(e);
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'transform',
        'translate(' + delta.x + 'px, ' + delta.y + 'px)'
      );
    }
  }
}
