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

  @HostBinding('style.width')
  width: string;

  @HostBinding('style.height')
  height: string;

  droppable: DroppableComponent;

  target: Observable<boolean>;

  private _origin = '';

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

  onFactoryInit(id: string, viewRef: ViewRef, droppable: DroppableComponent): void {
    this.viewRef = viewRef;
    this.droppable = droppable;
    this._origin = droppable.name;
    this.dragAndDropService.draggables.register(id, this);
  }

  origin(): string {
    return this._origin;
  }

  detatch(): void {
    this.unsetSize();
    this.dragAndDropService.emitRemove(this);
    this.droppable.viewContainerRef.detach(this.index());
  }

  remove(): void {
    this.dragAndDropService.emitRemove(this);
    this.droppable.viewContainerRef.remove(this.index());
  }

  index(): number {
    return this.droppable.viewContainerRef.indexOf(this.viewRef);
  }

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

  private unsetSize(): void {
    this.width = null;
    this.height = null;
  }

  private clearSelection(draggable: HTMLElement): void {
    const selection = window.getSelection();
    if (selection.containsNode(draggable, true)) {
      selection.empty();
    }
  }

  private content(): HTMLElement[] {
    return Array.from((this.transitContainerElementRef.nativeElement as HTMLElement).children) as HTMLElement[];
  }
}
