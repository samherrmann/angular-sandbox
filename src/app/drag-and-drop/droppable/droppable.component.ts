import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild, Type, ElementRef, Input, Renderer2, Attribute } from '@angular/core';
import { DraggableFactoryService } from '../draggable/draggable-factory.service';
import { Subscription } from 'rxjs/Subscription';
import { DragAndDropService } from '../drag-and-drop.service';
import { RegistryService } from '../registry.service';

@Component({
  selector: 'app-droppable',
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
      this.registryService.unregister(this);
    }
    // register droppable with new name.
    if (value) {
      this.registryService.register(value, this);
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
    private registryService: RegistryService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Attribute('swappable') swappable) {
      this.swappable = swappable !== null;
    }

  ngOnInit() {
    this.scrollable = this.scrollabelRef.nativeElement;
    this.subs.push(this.handleWheel());
  }

  addDraggable<T>(component: Type<T>): void {
    this.draggableFactoryService.addDraggable(component, this);
  }

  addDraggables<T>(components: Type<T>[]): void {
    this.draggableFactoryService.addDraggables(components, this);
  }

  scrollUp() {
    this.scroll(-this.scrollRatio * this.scrollable.clientHeight);
  }

  scrollDown() {
    this.scroll(this.scrollRatio * this.scrollable.clientHeight);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
    this.registryService.unregister(this);
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
