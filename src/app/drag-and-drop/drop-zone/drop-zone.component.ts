import { Component, OnInit, OnDestroy, Input, ElementRef, SkipSelf, Optional } from '@angular/core';
import { RelativeLocation } from './relative-location';
import { SwipeTargetService } from '../../swipe/swipe-target.service';
import { DraggableComponent } from '../draggable/draggable.component';
import { Subscription } from 'rxjs/Subscription';
import { DroppableComponent } from '../droppable/droppable.component';
import { DragAndDropService } from '../drag-and-drop.service';
import { Location } from '../relocation/location';

/**
 * This component is used to identify areas in which
 * a draggable that is being dragged can be dropped.
 * This component is intended to only be used internally
 * by the drag and drop module.
 */
@Component({
  selector: 'dnd-drop-zone',
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
              @Optional() @SkipSelf() private _draggable: DraggableComponent,
              @Optional() @SkipSelf() private _droppable: DroppableComponent) {}

  ngOnInit() {
    this.swipeTargetService.register(this.elementRef.nativeElement);
    this.translateSwipeToDragEvents();
  }

  /**
   * Returns the {@link Location} of this dropzone.
   * Returns `null` if this component is not
   * inside a draggable or a droppable.
   */
  location(): Location {
    let location: Location = null;
    if (this._draggable) {
      let index = this._draggable.index();
      if (this.dropPosition === 'after' && !this._draggable.droppable.swappable) {
        index += 1;
      }
      location = new Location(this._draggable.droppable, index);

    } else if (this._droppable) {
      location = new Location(this._droppable, null);
    }
    return location;
  }

  /**
   * Returns the {@link DraggableComponent} that this
   * dropzone is located in. Returns `null` if this
   * dropzone is not located in a draggable.
   */
  draggable(): DraggableComponent {
    return this._draggable;
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private translateSwipeToDragEvents(): void {
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
}
