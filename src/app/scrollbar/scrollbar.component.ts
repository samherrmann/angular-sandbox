import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { ScrollbarService } from './scrollbar.service';

@Component({
  selector: 'app-scrollbar',
  templateUrl: './scrollbar.component.html',
  styleUrls: ['./scrollbar.component.scss']
})
export class ScrollbarComponent {

  @ViewChild('scrollable')
  scrollable: ElementRef<HTMLElement>;

  thumbYTop = 0;

  thumbXLeft = 0;

  thumbYLength = 0;

  thumbXLength = 0;

  scrollableDimensions = {
    width: `calc(100% + ${this.scrollbarService.width}px)`,
    height: `calc(100% + ${this.scrollbarService.width}px)`
  };

  constructor(private scrollbarService: ScrollbarService) { }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.positionThumbs();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.resetThumbs();
  }

  onScroll(): void {
    this.positionThumbs();
  }

  private positionThumbs(): void {
    const scrollHeight = this.scrollable.nativeElement.scrollHeight;
    const clientHeight = this.scrollable.nativeElement.clientHeight;
    this.thumbYTop = this.scrollable.nativeElement.scrollTop * clientHeight / scrollHeight;
    this.thumbYLength = Math.pow(clientHeight, 2) / scrollHeight;

    const scrollWidth = this.scrollable.nativeElement.scrollWidth;
    const clientWidth = this.scrollable.nativeElement.clientWidth;
    this.thumbXLeft = this.scrollable.nativeElement.scrollLeft * clientWidth / scrollWidth;
    this.thumbXLength = Math.pow(clientWidth, 2) / scrollWidth;
  }

  private resetThumbs(): void {
    this.thumbXLeft = 0;
    this.thumbXLength = 0;
    this.thumbYLength = 0;
    this.thumbYTop = 0;
  }
}
