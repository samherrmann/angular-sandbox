import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwipeZoneDirective } from './swipe-zone.directive';
import { SwipeTargetDirective } from './swipe-target.directive';
import { SwipeZoneService } from './swipe-zone.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SwipeZoneDirective,
    SwipeTargetDirective
  ],
  exports: [
    SwipeZoneDirective,
    SwipeTargetDirective
  ],
  providers: [
    SwipeZoneService
  ]
})
export class SwipeModule { }
