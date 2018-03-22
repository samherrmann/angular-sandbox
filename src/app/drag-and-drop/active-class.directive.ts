import { Directive, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { DragAndDropService } from './drag-and-drop.service';
import { Subscription } from 'rxjs/Subscription';

/**
 * This directive adds a `drag-and-drop-is-active` CSS class to the
 * host element for styling when a draggable is being dragged.
 */
@Directive({
  selector: '[dndActiveClass]'
})
export class ActiveClassDirective implements OnInit, OnDestroy {

  @HostBinding('class.drag-and-drop-is-active')
  isActive = false;

  private sub: Subscription;

  constructor(private dragAndDropService: DragAndDropService) { }

  ngOnInit() {
    this.sub = this.dragAndDropService.active.subscribe(isActive => this.isActive = isActive);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
