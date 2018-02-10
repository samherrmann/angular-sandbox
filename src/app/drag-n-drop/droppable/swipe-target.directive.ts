import { Directive } from '@angular/core';
import { SwipeTargetService } from '../../swipe/swipe-target.service';
import { SwipeTargetDirective as BaseDirective } from '../../swipe/swipe-target.directive';

/**
 * This definition enables adding the {@link SwipeTargetDirective}
 * on the same host element as the {@link DroppableComponent}.
 * See https://github.com/angular/angular/issues/8785
 *
 * We need to add a tslint exception here because tslint
 * enforces that directives use attribute selectors and
 * not element selectors. In this case we need the selector
 * to match the selector of the component on which we want
 * to apply this directive.
 */
// tslint:disable:directive-selector
@Directive({
  selector: 'app-droppable',
  providers: [
    SwipeTargetService
  ]
})
export class SwipeTargetDirective extends BaseDirective { }
