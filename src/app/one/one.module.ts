import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneComponent } from './one.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OneComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: OneComponent
    }])
  ]
})
export class OneModule { }
