import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FeatureChildComponent } from './feature-child.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [FeatureChildComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: FeatureChildComponent
    }])
  ],
})
export class FeatureChildModule { }
