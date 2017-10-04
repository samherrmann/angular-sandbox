import { Component, ViewContainerRef, ViewChild, TemplateRef, ViewChildren,
  ChangeDetectorRef, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { FooComponent } from './foo/foo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChildren('dynChild') dynChildren: QueryList<ElementRef>;

  @ViewChild(FooComponent) fooComponent: FooComponent;

  constructor() { }

  ngAfterViewInit() {
    for (let i = 0; i < 3; i++) {
      this.fooComponent.createChild(this.dynChildren);
    }
  }
}
