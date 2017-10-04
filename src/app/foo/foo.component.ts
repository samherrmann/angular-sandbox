import { Component, OnInit, ViewChild, QueryList, ViewChildren, TemplateRef,
  ViewContainerRef, ElementRef, ChangeDetectorRef, ContentChild, AfterViewInit,
  Output, EventEmitter, EmbeddedViewRef, Input, SkipSelf, Injector
} from '@angular/core';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})
export class FooComponent implements OnInit {

  @ViewChild('vc', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  @ContentChild(TemplateRef) tplRef: TemplateRef<any>;

  private changeDetector: ChangeDetectorRef;

  constructor(@SkipSelf() injector: Injector) {
    this.changeDetector = injector.get(ChangeDetectorRef);
  }

  ngOnInit() { }

  // @ViewChildren does not detect when children are added that originate from
  // an external template. That also appears to be the case when the template
  // is obtined through @ContentChild. As a workaround, we require the QueryList
  // from the parent component.
  createChild(viewChildren: QueryList<any>) {
    const viewRef = this.viewContainerRef.createEmbeddedView(this.tplRef);
    this.changeDetector.detectChanges();
    console.log(viewChildren);
  }
}
