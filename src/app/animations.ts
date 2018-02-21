import { trigger, transition, style, animate } from '@angular/core';

export const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({
      width: 0
    }),
    animate('200ms ease')
  ]),
  transition(':leave', [
    animate('200ms ease-out',
    style({
      width: 0
    }))
  ])
]);
