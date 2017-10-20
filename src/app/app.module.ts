import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CollapsableModule } from './collapsable/collapsable.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CollapsableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
