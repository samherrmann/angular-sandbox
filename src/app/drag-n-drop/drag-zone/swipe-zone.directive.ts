import { Directive } from '@angular/core';
import { SwipeZoneService } from '../../swipe/swipe-zone.service';
import { SwipeZoneDirective as BaseDirective } from '../../swipe/swipe-zone.directive';

// This is a temporary solution of adding a directive to
// the host element of another directive. As of Angular v5,
// it is not possible to achieve that in a clean, concise
// way. It is expected that this ability will become
// available after Angular v6.
// See https://github.com/angular/angular/issues/8785
@Directive({
  selector: '[appDragZone]',
  providers: [
    SwipeZoneService
  ]
})
export class SwipeZoneDirective extends BaseDirective { }
