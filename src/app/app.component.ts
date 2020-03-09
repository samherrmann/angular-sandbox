import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, Inject } from '@angular/core';
import { FOO_EXTENSIONS, FooExtensionFactory } from './foo/foo-extension';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('vcr', { read: ViewContainerRef })
  private vcr: ViewContainerRef;

  constructor(
    private readonly cfr: ComponentFactoryResolver,
    @Inject(FOO_EXTENSIONS) private readonly extensions: FooExtensionFactory[]
  ) {}

  lazyLoad(): void {
    this.extensions.forEach(dynamicImport => {
      dynamicImport().then(ext => {
        const component = this.cfr.resolveComponentFactory(ext);
        this.vcr.createComponent(component);
      });
    });
  }
}
