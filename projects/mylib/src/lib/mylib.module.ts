import { NgModule, APP_INITIALIZER } from '@angular/core';
import { MylibComponent } from './mylib.component';

export function myLibInit() {
  const fn = () => { console.log('Hi from exported function') };
  return fn;
}

@NgModule({
  imports: [
  ],
  declarations: [MylibComponent],
  exports: [MylibComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: myLibInit
    }
  ]
})
export class MylibModule { }
