import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapsableDirective } from './collapsable.directive';
import { CollapseButtonComponent } from './collapse-button/collapse-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CollapsableDirective,
    CollapseButtonComponent
  ],
  exports: [
    CollapsableDirective,
    CollapseButtonComponent
  ]
})
export class CollapsableModule { }
