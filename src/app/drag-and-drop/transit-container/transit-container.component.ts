import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { DraggableService } from '../draggable/draggable.service';
import { Subscription } from 'rxjs/Subscription';

/**
 * This component facilitates the positioning of the draggable
 * view while the draggable is being dragged. It is a child
 * component of the {@link DraggableComponent}. When a draggable
 * is being dragged, the {@link DraggableComponent} hosts the
 * shadow and jumps from droppable to droppable as the pointer
 * moves over them. This component hosts the real draggable
 * conen and follows the pointer. Ideally this component would
 * be a directive that is applied on the root element of the
 * draggable content. Adding a directive to an element dynamically
 * is as of Angular v5 not possible
 * (see https://github.com/angular/angular/issues/8785).
 *
 * This component is intended to only be used internally by the
 * drag and drop module.
 */
@Component({
  selector: 'dnd-transit-container',
  templateUrl: './transit-container.component.html',
  styleUrls: ['./transit-container.component.scss']
})
export class TransitContainerComponent implements OnInit, OnDestroy {

  @HostBinding('class.in-transit')
  isInTransit = false;

  @HostBinding('style.width')
  width: string;

  @HostBinding('style.height')
  height: string;

  @HostBinding('style.top')
  top: string;

  @HostBinding('style.left')
  left: string;

  @HostBinding('style.transform')
  transform: string;

  private subs: Subscription[] = [];

  constructor(private draggableService: DraggableService) { }

  ngOnInit() {
    this.subs.push(
      this.handleDrag(),
      this.handleDragEnd()
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  onDragStart(draggable: ClientRect) {
    this.width = draggable.width + 'px';
    this.height = draggable.height + 'px';
    this.isInTransit = true;
    this.top = draggable.top + 'px';
    this.left = draggable.left + 'px';
  }

  private handleDrag() {
    return this.draggableService.drag.subscribe(delta => {
      this.transform = `translate(${delta.x}px, ${delta.y}px)`;
    });
  }

  private handleDragEnd() {
    return this.draggableService.dragEnd.subscribe(e => {
      this.isInTransit = false;
      this.width = null;
      this.height = null;
      this.top = null;
      this.left = null;
      this.transform = null;
    });
  }
}
