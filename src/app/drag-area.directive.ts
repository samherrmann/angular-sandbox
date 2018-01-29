import { Directive, HostListener, OnInit, OnDestroy, ElementRef} from '@angular/core';
import { DragAndDropService } from './drag-and-drop.service';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[appDraggableArea]'
})
export class DragAreaDirective implements OnInit, OnDestroy {

  private isActive = false;

  private subscriptions: Subscription[] = [];

  constructor(private dragAndDropService: DragAndDropService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.subscriptions.push(
      this.dragAndDropService.isActive.subscribe(isActive => {
        this.isActive = isActive;
      }),
      this.dragAndDropService.events.pipe(
        filter(e => e.type === 'dragstart')
      ).subscribe(e => {
        this.createGhostImage(e.draggable.componetRef.location.nativeElement);
      })
    );
  }

  @HostListener('pointermove', ['$event'])
  pointerMove(e: PointerEvent) {
    if (this.isActive) {
      this.dragAndDropService.drag(e);
    }
  }

  @HostListener('pointerup', ['$event'])
  pointerUp(e: PointerEvent) {
    this.dragAndDropService.dragEnd(e);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private createGhostImage(el: HTMLElement) {
    const clone = <HTMLElement>el.cloneNode(true);
    clone.style.width = el.offsetWidth + 'px';
    clone.style.height = el.offsetHeight + 'px';
    this.elementRef.nativeElement.appendChild(clone);
  }
}
