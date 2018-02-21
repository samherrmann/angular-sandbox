import { Component, ViewChildren, QueryList, trigger, transition, animate, style, ViewChild } from '@angular/core';
import { DroppableComponent } from './drag-and-drop/droppable/droppable.component';
import { TemplateDirective } from './drag-and-drop/template.directive';

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
export class AppComponent {

  isDrawerOpen = false;

  @ViewChildren(DroppableComponent)
  droppables: QueryList<DroppableComponent>;

  @ViewChild(TemplateDirective)
  draggableTpl: TemplateDirective;

  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
    if (this.isDrawerOpen) {
      setTimeout(() => {
        const drawer = this.droppables.find(item => item.name === 'drawer');
        for (let i = 0; i < 3; i++) {
          this.draggableTpl.create('draggable-' + i, drawer);
        }
      });
    }
  }
}
