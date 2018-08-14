import { NgModule } from '@angular/core';
import { BarComponent } from './bar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [BarComponent],
  exports: [BarComponent]
})
export class BarModule { }
