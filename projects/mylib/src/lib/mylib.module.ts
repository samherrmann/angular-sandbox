import { NgModule } from '@angular/core';
import { Mylib2Module } from 'mylib2';
import { MylibComponent } from './mylib.component';


@NgModule({
  declarations: [MylibComponent],
  imports: [
    Mylib2Module
  ],
  exports: [MylibComponent]
})
export class MylibModule { }
