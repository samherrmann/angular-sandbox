import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { BarModule } from 'bar';
import { FooService } from 'foo';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BarModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (fooService: FooService) => () => {
        fooService.init({x: 'Hello World!'})
      },
      multi: true,
      deps: [FooService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
