import { Component, OnInit, ViewChild, Renderer2, Input, ElementRef, OnDestroy } from '@angular/core';
import { DragNDropService } from '../drag-n-drop.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-scrollable',
  templateUrl: './scrollable.component.html',
  styleUrls: ['./scrollable.component.scss']
})
export class ScrollableComponent implements OnInit, OnDestroy {

  @Input()
  scrollRatio = 0.02;

  @ViewChild('scrollable')
  scrollabelRef: ElementRef;

  dragActive = this.dragNDropService.active;

  private scrollable: HTMLElement;

  private subs: Subscription[] = [];

  constructor(private dragNDropService: DragNDropService,
    private renderer: Renderer2,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.scrollable = this.scrollabelRef.nativeElement;
    this.subs.push(this.handleWheel());
  }

  scrollUp() {
    this.scroll(-this.scrollRatio * this.scrollable.clientHeight);
  }

  scrollDown() {
    this.scroll(this.scrollRatio * this.scrollable.clientHeight);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private scroll(deltaY: number) {
    this.renderer.setProperty(this.scrollable, 'scrollTop', this.scrollable.scrollTop += deltaY);
  }

  private handleWheel(): Subscription {
    return this.dragNDropService.listenWhenActive<WheelEvent>(
      this.elementRef.nativeElement,
      'wheel'
    ).subscribe(e => {
      this.scroll(e.deltaY);
    });
  }
}
