import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  @ViewChild('target') target: ElementRef;

  @ViewChild('left') left: ElementRef;

  @ViewChild('right') right: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    setTimeout(() => {
      this.renderer.appendChild(this.right.nativeElement, this.target.nativeElement)
    }, 10000);
  }
}
