import { Component, OnInit, ViewContainerRef, ViewChild, HostBinding, ElementRef, Type } from '@angular/core';
import { DroppableService } from './droppable.service';
import { DraggableFactoryService } from '../draggable/draggable-factory.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-droppable',
  templateUrl: './droppable.component.html',
  styleUrls: ['./droppable.component.scss'],
  providers: [
    DroppableService
  ]
})
export class DroppableComponent implements OnInit {

  @ViewChild('vc', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

  @HostBinding('class.droptarget')
  isDropTarget = false;

  private subscriptions: Subscription[] = [];

  constructor(public elementRef: ElementRef,
    private droppableService: DroppableService,
    private draggableFactoryService: DraggableFactoryService) { }

  ngOnInit() {
    this.droppableService.register(this);
    this.subscriptions.push(
      this.droppableService.dragLeaveEvents(this).subscribe(e => {
        this.isDropTarget = false;
      }),
      this.droppableService.dragEnterEvents(this).subscribe(e => {
        this.isDropTarget = true;
      }),
      this.droppableService.dragEndEvents().subscribe(e => {
        this.isDropTarget = false;
      })
    );
  }

  addDraggable<T>(component: Type<T>): void {
    this.draggableFactoryService.addDraggable(component, this);
  }

  ngOnDestory() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
