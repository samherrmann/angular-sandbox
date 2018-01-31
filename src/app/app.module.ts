import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ExampleComponent } from './example/example.component';
import { DragNDropModule } from './drag-n-drop/drag-n-drop.module';

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
    DragNDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
