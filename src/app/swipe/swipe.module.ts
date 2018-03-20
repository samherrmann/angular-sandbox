import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwipeZoneDirective } from './swipe-zone.directive';
import { SwipeTargetDirective } from './swipe-target.directive';
import { SwipeZoneService } from './swipe-zone.service';
import { SwipeHandleDirective } from './swipe-handle.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SwipeZoneDirective,
    SwipeTargetDirective,
    SwipeHandleDirective
  ],
  exports: [
    SwipeZoneDirective,
    SwipeTargetDirective,
    SwipeHandleDirective
  ],
  providers: [
    SwipeZoneService
  ]
})
export class SwipeModule { }
