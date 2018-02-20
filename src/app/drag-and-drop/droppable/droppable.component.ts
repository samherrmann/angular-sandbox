import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild, Type, ElementRef,
  Input, Renderer2, Attribute, ChangeDetectorRef } from '@angular/core';
import { DraggableFactoryService } from '../draggable/draggable-factory.service';
import { Subscription } from 'rxjs/Subscription';
import { DragAndDropService } from '../drag-and-drop.service';

@Component({
  selector: 'dnd-droppable',
  templateUrl: './droppable.component.html',
  styleUrls: ['./droppable.component.scss']
})
export class DroppableComponent implements OnInit, OnDestroy {

  readonly swappable: boolean = false;

  @Input()
  scrollRatio = 0.02;

  @Input()
  set name(value: string) {
    // unregister droppable if the new name
    // is empty or if the droppable was already
    // registered under a different name.
    if (!value || (value && this._name)) {
      this.dragAndDropService.droppables.unregister(this);
    }
    // register droppable with new name.
    if (value) {
      this.dragAndDropService.droppables.register(value, this);
    }
    this._name = value;
  }

  get name(): string {
    return this._name;
  }

  @ViewChild('scrollable')
  scrollabelRef: ElementRef;

  @ViewChild('vc', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

  dragActive = this.dragAndDropService.active;

  private scrollable: HTMLElement;

  private _name = '';

  private subs: Subscription[] = [];

  constructor(private draggableFactoryService: DraggableFactoryService,
    private dragAndDropService: DragAndDropService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    @Attribute('swappable') swappable) {
      this.swappable = swappable !== null;
    }

  ngOnInit() {
    this.scrollable = this.scrollabelRef.nativeElement;
    this.subs.push(this.handleWheel());
  }

  addDraggable<T>(id: string, component: Type<T>): void {
    this.draggableFactoryService.addDraggable(id, component, this);
    // We need to manually inform Angular to detect changes here because
    // this method is most likely called from inside a lifecycle hook.
    // Adding draggables during a change detection cycle causes the
    // "Expression has changed after it was checked" error if we do not
    // inform Angular of the change.
    this.cdr.detectChanges();
  }

  scrollUp() {
    this.scroll(-this.scrollRatio * this.scrollable.clientHeight);
  }

  scrollDown() {
    this.scroll(this.scrollRatio * this.scrollable.clientHeight);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
    this.dragAndDropService.droppables.unregister(this);
  }

  private scroll(deltaY: number) {
    this.renderer.setProperty(this.scrollable, 'scrollTop', this.scrollable.scrollTop += deltaY);
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
