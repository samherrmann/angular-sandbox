import { Component, OnInit, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { DragNDropService } from '../drag-n-drop.service';
import { SwipeEvent } from '../../swipe/swipe-event';

@Component({
  selector: 'app-scrollable',
  templateUrl: './scrollable.component.html',
  styleUrls: ['./scrollable.component.scss']
})
export class ScrollableComponent implements OnInit {

  @Input()
  scrollPercentage = 0.02;

  @ViewChild('scrollable')
  scrollabel: ElementRef;

  isDragActive = this.dragNDropService.isActive;

  constructor(private renderer: Renderer2,
    private dragNDropService: DragNDropService) { }

  ngOnInit() { }

  scrollUp(e: SwipeEvent) {
    const el: HTMLElement = this.scrollabel.nativeElement;
    const scrollTop = el.scrollTop - this.scrollPercentage * el.clientHeight;
    this.renderer.setProperty(el, 'scrollTop', scrollTop);
  }

  scrollDown(e: SwipeEvent) {
    const el: HTMLElement = this.scrollabel.nativeElement;
    const scrollTop = el.scrollTop + this.scrollPercentage * el.clientHeight;
    this.renderer.setProperty(el, 'scrollTop', scrollTop);
  }
}
