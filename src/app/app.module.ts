import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ExampleComponent } from './example/example.component';
import { DragNDropModule } from './drag-n-drop/drag-n-drop.module';
import { SwipeModule } from './swipe/swipe.module';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent
  ],
  entryComponents: [
    ExampleComponent
  ],
  imports: [
    BrowserModule,
    DragNDropModule,
    SwipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
