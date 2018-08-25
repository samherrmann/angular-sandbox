import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MylibModule } from 'mylib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MylibModule.forRoot({
      a: 2,
      b: 'hello',
      c: {
        d: 0,
        e: ''
        // leave f undefined
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
