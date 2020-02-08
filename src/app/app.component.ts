import { Component, ViewChild, TemplateRef, ViewContainerRef, ComponentFactoryResolver, Injector } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('vcr', { read: ViewContainerRef })
  private vcr: ViewContainerRef;

  constructor(private readonly cfr: ComponentFactoryResolver) {}

  lazyLoad(): void {
    import('../app/foo/foo.component').then(
      ({ FooComponent }) => {
        const component = this.cfr.resolveComponentFactory(
          FooComponent
        );
        this.vcr.createComponent(component);
      }
    );
  }
}
