import { Directive, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { DragAndDropService } from './drag-and-drop.service';
import { Subscription } from 'rxjs/Subscription';

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
