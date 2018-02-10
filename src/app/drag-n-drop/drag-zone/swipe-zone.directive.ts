import { Directive } from '@angular/core';
import { SwipeZoneService } from '../../swipe/swipe-zone.service';
import { SwipeZoneDirective as BaseDirective } from '../../swipe/swipe-zone.directive';

/**
 * This definition enables adding the {@link SwipeZoneDirective}
 * on the same host element as the {@link DragZoneDirective}.
 * See https://github.com/angular/angular/issues/8785
 */
@Directive({
  selector: '[appDragZone]',
  providers: [
    SwipeZoneService
  ]
})
export class SwipeZoneDirective extends BaseDirective { }
