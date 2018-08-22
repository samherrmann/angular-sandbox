import { NgModule, APP_INITIALIZER } from '@angular/core';
import { MylibComponent } from './mylib.component';

export function myLibInit() {
  return () => console.log('Hi from exported function');
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
      /**
       * Option 1. Defining the useFactory function as an exported function as instructed in
       * the docs - https://angular.io/guide/aot-compiler#function-calls-are-not-supported:
       * - Throws build error in both dev and prod: "Lambda not supported"
       */
      useFactory: myLibInit

      /**
       * Option 2. Defining the useFactory function using the ES6 object method shorthand notation:
       * - Builds successfully in both dev and prod
       * - No runtime error in dev
       * - Throws runtime error in prod: "TypeError: this.appInits[i] is not a function"
       */
      // useFactory() {
      //   return () => console.log('Hi from ES6 object method shorthand')
      // }
    }
  ]
})
export class MylibModule { }
