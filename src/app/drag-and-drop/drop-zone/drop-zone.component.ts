import { Component, OnInit, OnDestroy, Input, ElementRef, SkipSelf, Optional } from '@angular/core';
import { RelativeLocation } from './relative-location';
import { SwipeTargetService } from '../../swipe/swipe-target.service';
import { DraggableComponent } from '../draggable/draggable.component';
import { Subscription } from 'rxjs/Subscription';
import { DroppableComponent } from '../droppable/droppable.component';

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.scss'],
  providers: [
    SwipeTargetService
  ]
})
export class DropZoneComponent implements OnInit, OnDestroy {

  @Input()
  dropPosition: RelativeLocation = 'after';

  private subs: Subscription[] = [];

  constructor(private swipeTargetService: SwipeTargetService,
    private elementRef: ElementRef,
    @Optional() @SkipSelf() private draggable: DraggableComponent,
    @Optional() @SkipSelf() private droppable: DroppableComponent) { }

  ngOnInit() {
    this.swipeTargetService.register(this.elementRef.nativeElement);

    this.subs.push(
      this.swipeTargetService.swipeEnter.subscribe(e => {
        if (this.draggable) {
          console.log(this.draggable);
        } else if (this.droppable) {
          console.log(this.droppable);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
