import { Directive, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { DraggableService } from './draggable/draggable.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[appInTransit]'
})
export class InTransitDirective implements OnInit, OnDestroy {

  @HostBinding('class.draggable-in-transit')
  isDragActive = false;

  private sub: Subscription;

  constructor(private draggableService: DraggableService) { }

  ngOnInit() {
    this.sub = this.draggableService.active.subscribe(value => this.isDragActive = value);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
