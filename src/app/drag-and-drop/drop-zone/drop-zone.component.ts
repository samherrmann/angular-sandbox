import { Component, OnInit, OnDestroy, Input, ElementRef, SkipSelf, Optional } from '@angular/core';
import { RelativeLocation } from './relative-location';
import { SwipeTargetService } from '../../swipe/swipe-target.service';
import { DraggableComponent } from '../draggable/draggable.component';
import { Subscription } from 'rxjs/Subscription';
import { DroppableComponent } from '../droppable/droppable.component';
import { DragAndDropService } from '../drag-and-drop.service';
import { Location } from './location';

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

  constructor(private dragAndDropService: DragAndDropService,
    private swipeTargetService: SwipeTargetService,
    private elementRef: ElementRef,
    @Optional() @SkipSelf() private draggable: DraggableComponent,
    @Optional() @SkipSelf() private droppable: DroppableComponent) { }

  ngOnInit() {
    this.swipeTargetService.register(this.elementRef.nativeElement);

    this.subs.push(
      this.swipeTargetService.swipeEnter.subscribe(e => {
        this.dragAndDropService.emitDragEnter(e.pointerEvent, this);
      }),
      this.swipeTargetService.swipeOver.subscribe(e => {
        this.dragAndDropService.emitDragOver(e.pointerEvent, this);
      }),
      this.swipeTargetService.swipeLeave.subscribe(e => {
        this.dragAndDropService.emitDragLeave(e.pointerEvent, this);
      })
    );
  }

  location(): Location {
    if (this.draggable) {
      let index = this.draggable.index();
      if (this.dropPosition === 'after') {
        index += 1;
      }

      return {
        droppable: this.draggable.container,
        index: index
      };

    } else if (this.droppable) {
      return {
        droppable: this.droppable,
        index: null
      };
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
