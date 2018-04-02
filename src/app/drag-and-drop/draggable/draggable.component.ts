import { Component, OnInit, OnDestroy, HostBinding, ElementRef, ViewRef, ViewChild } from '@angular/core';
import { DraggableService } from './draggable.service';
import { DroppableComponent } from '../droppable/droppable.component';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { DragAndDropService } from '../drag-and-drop.service';
import { DraggableFactoryService } from './draggable-factory.service';
import { TransitService } from './transit.service';
import { TransitContainerComponent } from '../transit-container/transit-container.component';

/**
 * This component is the main container for draggable content.
 *
 * When a draggable is being dragged, the content follows the pointer and this
 * component is solely a placeholder indicating where the content will be
 * dropped at any given time. During this period, the component contains
 * the CSS class `in-transit.
 *
 * To style the placeholder in an application, use `dnd-draggable.in-transit`
 * as the selector.
 */
@Component({
  selector: 'dnd-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.scss'],
  providers: [
    DraggableService,
    TransitService
  ]
})
export class DraggableComponent implements OnInit, OnDestroy {

  @HostBinding('class.in-transit')
  isInTransit = false;

  @HostBinding('style.height')
  height = null;

  @HostBinding('style.width')
  width = null;

  @ViewChild(TransitContainerComponent)
  transitContainer: TransitContainerComponent;

  /**
   * The {@link DroppableComponet} that the draggable
   * is located in.
   */
  droppable: DroppableComponent;

  /**
   * See {@link DraggableService.target}
   */
  target: Observable<boolean>;

  removedFrom: DroppableComponent;

  private _origin = '';

  /**
   * The `ViewRef` of this component.
   */
  private viewRef: ViewRef;

  private subs: Subscription[] = [];

  constructor(private elementRef: ElementRef,
              private draggableService: DraggableService,
              private dragAndDropService: DragAndDropService,
              private draggableFactoryService: DraggableFactoryService) {
    this.draggableFactoryService.register(this);
  }

  ngOnInit() {
    this.draggableService.register(this);
    this.subs.push(
      this.handleDragStart(),
      this.handleRemove(),
      this.handleInsert(),
      this.handleDragEnd()
    );
    this.target = this.draggableService.target;
  }

  /**
   * This method is called by the {@link DraggableFactoryService} upon
   * instantiating this component.
   */
  onFactoryInit(id: string, viewRef: ViewRef, droppable: DroppableComponent): void {
    this.viewRef = viewRef;
    this.droppable = droppable;
    this._origin = droppable.name;
    this.dragAndDropService.draggables.register(id, this);
  }

  /**
   * Returns the name of the `origin` droppable, i.e. the
   * name of the droppable in which this draggable was
   * created.
   */
  origin(): string {
    return this._origin;
  }

  /**
   * Detaches the draggable from its droppable (`ViewContainerRef`).
   */
  detatch(): void {
    this.dragAndDropService.emitRemove(this);
    this.droppable.viewContainerRef.detach(this.index());
  }

  /**
   * Destroys the draggable.
   */
  remove(): void {
    this.dragAndDropService.emitRemove(this);
    this.droppable.viewContainerRef.remove(this.index());
  }

  /**
   * The index of the draggable within the droppable (`ViewContainerRef`).
   */
  index(): number {
    return this.droppable.viewContainerRef.indexOf(this.viewRef);
  }

  /**
   * Inserts the draggable into a droppable at a specified index.
   * @param droppable The droppable in which to add the draggable.
   * @param index     The index position at which to add the draggable
   *                  within the droppable. If `index` is not specified,
   *                  the draggable is appended to the end of the
   *                  droppable.
   */
  insert(droppable: DroppableComponent, index?: number): void {
    droppable.viewContainerRef.insert(this.viewRef, index);
    this.droppable = droppable;
    this.dragAndDropService.emitInsert(this);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
    this.dragAndDropService.draggables.unregister(this);
  }

  private handleDragStart(): Subscription {
    return this.draggableService.dragStart.subscribe(() => {
      const clientRect = this.clientRect();
      this.height = clientRect.height + 'px';
      this.width = clientRect.width + 'px';
      this.isInTransit = true;
      this.clearSelection(this.elementRef.nativeElement);
    });
  }

  private handleRemove(): Subscription {
    return this.draggableService.remove.subscribe(e => {
      this.removedFrom = e.draggable.droppable;
    });
  }

  private handleInsert(): Subscription {
    return this.draggableService.insert.subscribe(e => {
      if (this.removedFrom !== this.droppable) {
        this.height = null;
        this.width = null;

        requestAnimationFrame(() => {

          const height = (this.elementRef.nativeElement as HTMLElement).offsetHeight;
          if (height === 0) {
            this.transitContainer.width = this.clientRect().width + 'px';
            this.transitContainer.height = 'auto';

            requestAnimationFrame(() => {
              const clientRect = this.transitContainer.clientRect();
              this.height = clientRect.height + 'px';
            });
          }
        });
      }
    });
  }

  private handleDragEnd(): Subscription {
    return this.draggableService.dragEnd.subscribe(e => {
      this.isInTransit = false;
      this.height = null;
      this.width = null;
    });
  }

  private clientRect(): ClientRect {
    return (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect();
  }

  /**
   * Clears the selection if the given draggable is within the selection.
   * Browsers on desktops allow you to select content on a web page and
   * dragging it. If the draggable is within a selection, then the native
   * drag and drop feature in desktop browsers interferes with this
   * library. This method works around this issue.
   * @param draggable The draggable to test if it's within a selection.
   */
  private clearSelection(draggable: HTMLElement): void {
    const selection = window.getSelection();
    if (selection.containsNode(draggable, true)) {
      selection.empty();
    }
  }
}
