import {
  Component, OnInit, OnDestroy, ViewChild, ViewContainerRef,
  HostBinding, ElementRef, Renderer2, ViewRef,
} from '@angular/core';
import { DraggableService } from './draggable.service';
import { DroppableComponent } from '../droppable/droppable.component';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { DragAndDropService } from '../drag-and-drop.service';
import { TransitContainerComponent } from '../transit-container/transit-container.component';
import { DraggableFactoryService } from './draggable-factory.service';

@Component({
  selector: 'dnd-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.scss'],
  providers: [
    DraggableService
  ]
})
export class DraggableComponent implements OnInit, OnDestroy {

  @ViewChild('vc', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

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

  private shadow: HTMLElement[] = [];

  private viewRef: ViewRef;

  private subs: Subscription[] = [];

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef,
    private draggableService: DraggableService,
    private dragAndDropService: DragAndDropService,
    private draggableFactoryService: DraggableFactoryService) {

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

  get origin(): string {
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

      this.createShadow(this.content());
      this.insertShadow(
        this.elementRef.nativeElement,
        this.shadow
      );
    });
  }

  private handleDragEnd(): Subscription {
    return this.draggableService.dragEnd.subscribe(e => {
      this.removeShadow(this.shadow);

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

  private createShadow(content: HTMLElement[] ): void {
    const shadow: HTMLElement[] = [];

    content.forEach(el => {
      const clone = el.cloneNode(true) as HTMLElement;
      shadow.push(clone);
      this.renderer.addClass(clone, 'shadow');
    });
    this.shadow = shadow;
  }

  private insertShadow(draggable: HTMLElement, shadow: HTMLElement[]) {
    shadow.forEach(el => {
      this.renderer.appendChild(draggable, el);
    });
  }

  private removeShadow(shadow: HTMLElement[]) {
    shadow.forEach(el => {
      this.renderer.removeChild(el.parentNode, el);
    });
    this.shadow = [];
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
