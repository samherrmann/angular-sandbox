import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { DraggableService } from './draggable/draggable.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[appDraggableVideo]'
})
export class DraggableVideoDirective implements OnInit, OnDestroy {

  private video: HTMLVideoElement;

  private subscriptions: Subscription[] = [];

  private isPaused = false;

  constructor(elementRef: ElementRef,
    private draggableService: DraggableService) {

    this.video = elementRef.nativeElement;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.draggableService.dragStart.subscribe(e => {
        this.isPaused = this.video.paused;
      }),
      this.draggableService.drop.subscribe(e => {
        this.isPaused ? this.video.pause() : this.video.play();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
