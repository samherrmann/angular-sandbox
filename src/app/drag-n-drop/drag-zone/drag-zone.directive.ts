import { Directive, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { DragNDropService } from '../drag-n-drop.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[appDragZone]'
})
export class DragZoneDirective implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  constructor(private dragAndDropService: DragNDropService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.subs.push(
      this.handlePointerMove(),
      this.handlePointerUp()
    );
  }

  private handlePointerMove(): Subscription {
    return this.dragAndDropService.listenWhenActive<PointerEvent>(
      this.elementRef.nativeElement,
      'pointermove'
    ).subscribe(e => {
      this.dragAndDropService.emitDrag(e);
    });
  }

  private handlePointerUp(): Subscription {
    return this.dragAndDropService.listenWhenActive<PointerEvent>(
      this.elementRef.nativeElement,
      'pointerup'
    ).subscribe(e => {
      this.dragAndDropService.emitDragEnd(e);
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
