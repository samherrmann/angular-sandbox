import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild, ElementRef,
  Input, Renderer2, Attribute } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DragAndDropService } from '../drag-and-drop.service';

/**
 * This component is the main container in which a draggable can be dropped.
 * It supports scrolling while dragging a draggable with both a mouse and on
 * a touch screen. A droppable is sortable by defauly, i.e. allows a list of
 * draggables to be sorted. It can also be configured to be a swappable, in
 * which a draggable located on a swappable droppable will exchange places
 * with the draggable being dragged.
 *
 * ### Example
 * Sortable:
 * ```
 * <dnd-droppable></dnd-droppable>
 * ```
 *
 * Swappable:
 * ```
 * <dnd-droppable swappable></dnd-droppable>
 * ```
 */
@Component({
  selector: 'dnd-droppable',
  templateUrl: './droppable.component.html',
  styleUrls: ['./droppable.component.scss']
})
export class DroppableComponent implements OnInit, OnDestroy {

  readonly swappable: boolean = false;

  /**
   * A multiplier for the scroll increments that are applied
   * on every `drag` event over the scroll-up zone and
   * scroll-down zone (i.e. top and bottom of the droppable).
   * The total scroll amount is calculated by multiplying
   * the height of the droppable by the `scrollRatio`. This
   * design allows faster scrolling when the viewport of the
   * droppable is larger, and finer scrolling when the viewport
   * of the droppable is smaller.
   */
  @Input()
  scrollRatio = 0.02;

  /**
   * Registers the droppable with a name. A droppable must be registered
   * with a name if the ability to return the draggable back to its
   * origin through the use of {@link OriginControlDirective} is desired.
   * The name allows the origin droppable to be removed from the DOM
   * and re-added (new instance) without losing the "return to origin"
   * capability.
   */
  @Input()
  set name(value: string) {
    // Unregister droppable if the new name
    // is empty or if the droppable was already
    // registered under a different name.
    if (!value || (value && this._name)) {
      this.dragAndDropService.droppables.unregister(this);
    }
    // Register droppable with new name.
    if (value) {
      this.dragAndDropService.droppables.register(value, this);
    }
    this._name = value;
  }

  get name(): string {
    return this._name;
  }

  @ViewChild('scrollable')
  scrollable: ElementRef;

  @ViewChild('vc', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

  dragActive = this.dragAndDropService.active;

  private _name = '';

  private subs: Subscription[] = [];

  constructor(private dragAndDropService: DragAndDropService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Attribute('swappable') swappable) {
      this.swappable = swappable !== null;
    }

  ngOnInit() {
    this.subs.push(this.handleWheel());
  }

  /**
   * Scrolls the scrollbar of the scrollable container up.
   */
  scrollUp() {
    this.scroll(-this.scrollRatio * (this.scrollable.nativeElement as HTMLElement).clientHeight);
  }

  /**
   * Scrolls the scrollbar of the scrollable container down.
   */
  scrollDown() {
    this.scroll(this.scrollRatio * (this.scrollable.nativeElement as HTMLElement).clientHeight);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
    this.dragAndDropService.droppables.unregister(this);
  }

  private scroll(deltaY: number) {
    this.renderer.setProperty(
      this.scrollable, 'scrollTop',
      (this.scrollable.nativeElement as HTMLElement).scrollTop += deltaY
    );
  }

  private handleWheel(): Subscription {
    return this.dragAndDropService.listenWhenActive<WheelEvent>(
      this.elementRef.nativeElement,
      'wheel'
    ).subscribe(e => {
      this.scroll(e.deltaY);
    });
  }
}
