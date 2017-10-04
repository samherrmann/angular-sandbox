import { Component, ViewContainerRef, ViewChild, TemplateRef, ViewChildren,
  ChangeDetectorRef, QueryList, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('vc', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  @ViewChild('tpl') tplRef: TemplateRef<any>;

  @ViewChildren('dynChild') dynChild: QueryList<ElementRef>;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.dynChild.changes.subscribe((x) => {
      console.log(this.dynChild.last);
    });

    setTimeout(() => {
      // without calling detect changes after each time an embedded
      // view is created, only one event is detected.

      for (let i = 0; i < 3; i++) {
        this.viewContainerRef.createEmbeddedView(this.tplRef);
        this.changeDetectorRef.detectChanges();
      }
    }, 2000);
  }
}
