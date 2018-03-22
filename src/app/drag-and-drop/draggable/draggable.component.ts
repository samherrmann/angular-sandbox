import {
  Component, OnInit, OnDestroy, ViewChild,
  HostBinding, ElementRef, ViewRef,
} from '@angular/core';
import { DraggableService } from './draggable.service';
import { DroppableComponent } from '../droppable/droppable.component';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { DragAndDropService } from '../drag-and-drop.service';
import { TransitContainerComponent } from '../transit-container/transit-container.component';
import { DraggableFactoryService } from './draggable-factory.service';
import { ShadowService } from './shadow.service';

/**
 * This component is the main container for draggable content.
 */
@Component({
  selector: 'dnd-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.scss'],
  providers: [
    DraggableService,
    ShadowService
  ]
})
export class DraggableComponent implements OnInit, OnDestroy {

  @ViewChild(TransitContainerComponent)
  transitContainer: TransitContainerComponent;

  @ViewChild(TransitContainerComponent, { read: ElementRef })
  transitContainerElementRef: ElementRef;

  /**
   * The static width of this component on `dragstart`.
   * `null` at all other times.
   *
   * When a drag of the draggable is initiated, the
   * draggable creates a temporary static width and
   * height. The purpose for the static width and
   * height is to allow the real draggable content to
   * be removed from the flow of the document (to
   * follow the pointer) while not affecting the rest
   * of the document layout. Also, after the draggable
   * content is removed, a shadow is inserted in the
   * real content's place to provide the same resize
   * behaviour as the real content. Once the shadow is
   * in its place, the static width and height are
   * removed.
   */
  @HostBinding('style.width')
  width: string;

  /**
   * The static height of this component on drag start.
   * `null` at all other times.
   *
   * See {@link width}
   */
  @HostBinding('style.height')
  height: string;

  /**
   * The {@link DroppableComponet} that the draggable
   * is located in.
   */
  droppable: DroppableComponent;

  /**
   * See {@link DraggableService.target}
   */
  target: Observable<boolean>;

  private _origin = '';

  /**
   * The `ViewRef` of this component.
   */
  private viewRef: ViewRef;

  private subs: Subscription[] = [];

  constructor(private elementRef: ElementRef,
    private draggableService: DraggableService,
    private dragAndDropService: DragAndDropService,
    private draggableFactoryService: DraggableFactoryService,
    private shadowService: ShadowService) {

    this.draggableFactoryService.register(this);
  }

  ngOnInit() {
    this.draggableService.register(this);
    this.subs.push(
      this.handleDragStart(),
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
    this.unsetSize();
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
      const clientRect = (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect();
      this.width = clientRect.width + 'px';
      this.height = clientRect.height + 'px';

      this.transitContainer.onDragStart(clientRect);
      this.clearSelection(this.elementRef.nativeElement);

      this.shadowService.insert(this.elementRef.nativeElement, this.content());
    });
  }

  private handleDragEnd(): Subscription {
    return this.draggableService.dragEnd.subscribe(e => {
      this.shadowService.remove();

      // ensure width and height are unset in case the
      // draggable was never detatched (i.e. the draggable
      // was never moved).
      this.unsetSize();
    });
  }

  /**
   * Resets the height and width property of this component
   * to `null`.
   */
  private unsetSize(): void {
    this.width = null;
    this.height = null;
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

  /**
   * Returns a reference to the content root elements.
   *
   * This method obtains a reference to the content root elements by accessing
   * the DOM directly. Ideally a reference to the content would be obtained using
   * `@ContentChild` or `@ContentChildren`. Angular is however currently not able
   * to query content generically. To make use of `@ContentChild` or
   * `@ContentChildren` would require the user of this library to tag the root
   * content elements with either a predefined template variable or a directive.
   * That is undesireable because it's extra overhead to the library user and is
   * more error prone.
   *
   * See: https://github.com/angular/angular/issues/8563
   */
  private content(): HTMLElement[] {
    return Array.from((this.transitContainerElementRef.nativeElement as HTMLElement).children) as HTMLElement[];
  }
}
