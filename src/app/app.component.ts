import { Component, ViewChildren, OnDestroy, QueryList, AfterViewInit, trigger, transition, animate, style } from '@angular/core';
import { ExampleComponent } from './example/example.component';
import { DroppableComponent } from './drag-and-drop/droppable/droppable.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({
          width: 0
        }),
        animate('200ms ease')
      ]),
      transition(':leave', [
        animate('200ms ease-out',
        style({
          width: 0
        }))
      ])
    ])
  ]
})
export class AppComponent implements AfterViewInit, OnDestroy {

  isDrawerOpen = false;

  @ViewChildren(DroppableComponent)
  droppables: QueryList<DroppableComponent>;

  private sub: Subscription;

  ngAfterViewInit() {
    // upon changes in the droppable query list...
    this.sub = this.droppables.changes.subscribe(() => {
      // ...check if the drawer is open.
      const drawer = this.droppables.find(item => item.name === 'drawer');
      if (drawer) {
        // If the drawer is open, add 3 draggables. Note that a draggable
        // is not recreated if its ID already exists (outside of the drawer).
        for (let i = 0; i < 3; i++) {
          drawer.addDraggable('draggable-' + i, ExampleComponent);
        }
      }
    });
  }

  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
