import { Component, OnInit, OnDestroy, HostBinding, ElementRef } from '@angular/core';
import { DraggableService } from '../draggable/draggable.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-transit-container',
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

  constructor(private draggableService: DraggableService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.subs.push(
      this.handleDragStart(),
      this.handleDrag(),
      this.handleDragEnd()
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private handleDragStart() {
    return this.draggableService.dragStart.subscribe(e => {

      const el: HTMLElement = this.elementRef.nativeElement;
      const clientRect = el.getBoundingClientRect();

      this.isInTransit = true;
      this.width = el.offsetWidth + 'px';
      this.height = el.offsetHeight + 'px';
      this.top = clientRect.top + 'px';
      this.left = clientRect.left + 'px';
    });
  }

  private handleDrag() {
    return this.draggableService.drag.subscribe(delta => {
      this.transform = 'translate(' + delta.x + 'px, ' + delta.y + 'px)';
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
