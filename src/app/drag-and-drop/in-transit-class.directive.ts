import { Directive, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { DraggableService } from './draggable/draggable.service';
import { Subscription } from 'rxjs/Subscription';

/**
 * This directive adds a `draggable-in-transit` CSS class to the host
 * element when the parent {@link DraggableComponent} is being dragged.
 * This allows a child element of the draggable to be given a different
 * style while the draggable is being dragged.
 *
 * ### Example
 * ```
 * <ng-template #draggable>
 *   <dnd-draggable>
 *      <div dndInTransitClass></div>
 *   </dnd-draggable>
 * </ng-template>
 * ```
 */
@Directive({
  selector: '[dndInTransitClass]'
})
export class InTransitClassDirective implements OnInit, OnDestroy {

  @HostBinding('class.draggable-in-transit')
  isInTransit = false;

  private sub: Subscription;

  constructor(private draggableService: DraggableService) { }

  ngOnInit() {
    this.sub = this.draggableService.inTransit.subscribe(value => this.isInTransit = value);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
