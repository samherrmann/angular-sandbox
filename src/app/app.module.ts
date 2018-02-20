import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {  } from '@angular/animations';
import { AppComponent } from './app.component';
import { ExampleComponent } from './example/example.component';
import { DragAndDropModule } from './drag-and-drop/drag-and-drop.module';

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
    BrowserAnimationsModule,
    DragAndDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
