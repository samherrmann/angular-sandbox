import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DroppableComponent } from './droppable/droppable.component';
import { DraggableComponent } from './draggable/draggable.component';
import { DroppableService } from './droppable/droppable.service';
import { DraggableFactoryService } from './draggable/draggable-factory.service';

@NgModule({
  declarations: [
    AppComponent,
    DroppableComponent,
    DraggableComponent
  ],
  entryComponents: [
    DraggableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    DroppableService,
    DraggableFactoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
