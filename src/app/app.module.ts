import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, Injector, NgModule } from '@angular/core';

import { HelloWorldComponent } from './hello-world/hello-world.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [HelloWorldComponent],
  imports: [BrowserModule],
  entryComponents: [HelloWorldComponent]
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    // Convert component to a custom element.
    const HelloWorldElement = createCustomElement(HelloWorldComponent, { injector: this.injector });
    // Register the custom element with the browser.
    customElements.define('hello-world', HelloWorldElement);
  }
}
