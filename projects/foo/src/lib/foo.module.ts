/// <reference path="../typings.d.ts"/>

import { NgModule } from '@angular/core';
import { FooComponent } from './foo.component';

let x = MyLibrary;

@NgModule({
  declarations: [FooComponent],
  imports: [
  ],
  exports: [FooComponent]
})
export class FooModule { }
