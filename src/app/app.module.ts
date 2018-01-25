import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DroppableComponent } from './droppable/droppable.component';
import { DraggableComponent } from './draggable/draggable.component';
import { DraggableFactoryService } from './draggable/draggable-factory.service';
import { DragAreaDirective } from './drag-area.directive';
import { DragAndDropService } from './drag-and-drop.service';

@NgModule({
  declarations: [
    AppComponent,
    DroppableComponent,
    DraggableComponent,
    DragAreaDirective
  ],
  entryComponents: [
    DraggableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    DraggableFactoryService,
    DragAndDropService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
