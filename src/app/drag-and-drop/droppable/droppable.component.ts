import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild, ElementRef,
  Input, Renderer2, Attribute } from '@angular/core';
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

  scrollUp() {
    this.scroll(-this.scrollRatio * (this.scrollable.nativeElement as HTMLElement).clientHeight);
  }

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
