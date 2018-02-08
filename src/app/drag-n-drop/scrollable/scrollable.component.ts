import { Component, OnInit, ViewChild } from '@angular/core';
import { ScrollableDirective } from './scrollable.directive';
import { DragNDropService } from '../drag-n-drop.service';

@Component({
  selector: 'app-scrollable',
  templateUrl: './scrollable.component.html',
  styleUrls: ['./scrollable.component.scss']
})
export class ScrollableComponent implements OnInit {

  @ViewChild(ScrollableDirective)
  scrollabel: ScrollableDirective;

  dragActive = this.dragNDropService.active;

  constructor(private dragNDropService: DragNDropService) { }

  ngOnInit() { }

  scrollUp() {
    this.scrollabel.scrollUp();
  }

  scrollDown() {
    this.scrollabel.scrollDown();
  }
}
