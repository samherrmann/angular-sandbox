import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { DraggableService } from './draggable/draggable.service';
import { Subscription } from 'rxjs/Subscription';

/**
 * This directive needs to be applied on video elements when the video is
 * used inside the {@link DraggableComponent}.
 *
 * The purpose of this directive is to work around a bug in Google Chrome
 * which causes videos to stop playing after they are being moved. This
 * directive listens to events from the {@link DraggableService} and calls
 * `play` on the video after it's been moved if it was playing before it
 * was moved.
 *
 * ### Example:
 * ```html
 * <video [src]="url" dndVideo></video>
 * ```
 *
 * Google Chrome Bug:
 * See https://bugs.chromium.org/p/chromium/issues/detail?id=382879
 */
@Directive({
  selector: '[dndVideo]'
})
export class VideoDirective implements OnInit, OnDestroy {

  private video: HTMLVideoElement;

  private subscriptions: Subscription[] = [];

  private isPaused = false;

  constructor(elementRef: ElementRef,
    private draggableService: DraggableService) {

    this.video = elementRef.nativeElement;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.draggableService.remove.subscribe(e => {
        this.isPaused = this.video.paused;
      }),
      this.draggableService.insert.subscribe(e => {
        this.isPaused ? this.video.pause() : this.video.play();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
