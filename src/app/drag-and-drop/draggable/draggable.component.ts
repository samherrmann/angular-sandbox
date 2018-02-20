import {
  Component, OnInit, OnDestroy, ComponentRef, ViewChild, ViewContainerRef,
  HostBinding, ElementRef, Renderer2
} from '@angular/core';
import { DraggableService } from './draggable.service';
import { DroppableComponent } from '../droppable/droppable.component';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { DragAndDropService } from '../drag-and-drop.service';
import { TransitContainerComponent } from '../transit-container/transit-container.component';

@Component({
  selector: 'app-draggable',
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

  @HostBinding('style.width')
  width: string;

  @HostBinding('style.height')
  height: string;

  droppable: DroppableComponent;

  target: Observable<boolean>;

  private _origin = '';

  private shadow: HTMLElement;

  private host: ComponentRef<DraggableComponent>;

  private content: ComponentRef<any>;

  private subs: Subscription[] = [];

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef,
    private draggableService: DraggableService,
    private dragAndDropService: DragAndDropService) { }

  ngOnInit() {
    this.draggableService.register(this);
    this.subs.push(
      this.handleDragStart(),
      this.handleDragEnd()
    );
    this.target = this.draggableService.target;
  }

  onFactoryInit(host: ComponentRef<any>, content: ComponentRef<any>, droppable: DroppableComponent): void {
    this.host = host;
    this.content = content;
    this.droppable = droppable;
    this._origin = droppable.name;
  }

  get origin(): string {
    return this._origin;
  }

  detatch(): void {
    this.width = null;
    this.height = null;
    this.dragAndDropService.emitRemove(this);
    this.droppable.viewContainerRef.detach(this.index());
  }

  remove(): void {
    this.dragAndDropService.emitRemove(this);
    this.droppable.viewContainerRef.remove(this.index());
  }

  index(): number {
    return this.droppable.viewContainerRef.indexOf(this.host.hostView);
  }

  insert(droppable: DroppableComponent, index?: number): void {
    droppable.viewContainerRef.insert(this.host.hostView, index);
    this.droppable = droppable;
    this.dragAndDropService.emitInsert(this);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
    this.dragAndDropService.draggables.unregister(this);
  }

  private handleDragStart(): Subscription {
    return this.draggableService.dragStart.subscribe(() => {
      const el: HTMLElement = this.elementRef.nativeElement;
      const clientRect = el.getBoundingClientRect();
      this.transitContainer.onDragStart(clientRect);

      this.width = clientRect.width + 'px';
      this.height = clientRect.height + 'px';

      this.clearSelection(this.elementRef.nativeElement);
      this.createShadow(this.content.location.nativeElement);
      this.insertShadow(
        this.host.location.nativeElement,
        this.shadow
      );
    });
  }

  private handleDragEnd(): Subscription {
    return this.draggableService.dragEnd.subscribe(e => {
      this.removeShadow(e.draggable.shadow);
    });
  }

  private createShadow(el: HTMLElement): void {
    this.shadow = el.cloneNode(true) as HTMLElement;
    this.renderer.addClass(this.shadow, 'shadow');
  }

  private insertShadow(draggable: HTMLElement, shadow: HTMLElement) {
    this.renderer.appendChild(draggable, shadow);
  }

  private removeShadow(shadow: HTMLElement) {
    if (shadow) {
      this.renderer.removeChild(shadow.parentNode, shadow);
      this.shadow = null;
    }
  }

  private clearSelection(draggable: HTMLElement): void {
    const selection = window.getSelection();
    if (selection.containsNode(draggable, true)) {
      selection.empty();
    }
  }
}
