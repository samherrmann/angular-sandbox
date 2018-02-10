import { Component, OnInit, ViewChild, HostListener, Renderer2, Input, ElementRef } from '@angular/core';
import { DragNDropService } from '../drag-n-drop.service';

@Component({
  selector: 'app-scrollable',
  templateUrl: './scrollable.component.html',
  styleUrls: ['./scrollable.component.scss']
})
export class ScrollableComponent implements OnInit {

  @Input()
  scrollRatio = 0.02;

  @ViewChild('scrollable')
  scrollabelRef: ElementRef;

  dragActive = this.dragNDropService.active;

  private scrollable: HTMLElement;

  constructor(private dragNDropService: DragNDropService,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.scrollable = this.scrollabelRef.nativeElement;
  }

  @HostListener('wheel', ['$event'])
  mousewheel(e: WheelEvent) {
    if (this.dragNDropService.isActive()) {
      this.scroll(e.deltaY);
    }
  }

  scrollUp() {
    this.scroll(-this.scrollRatio * this.scrollable.clientHeight);
  }

  scrollDown() {
    this.scroll(this.scrollRatio * this.scrollable.clientHeight);
  }

  private scroll(deltaY: number) {
    this.renderer.setProperty(this.scrollable, 'scrollTop', this.scrollable.scrollTop += deltaY);
  }
}
