import { Component, Inject } from '@angular/core';
import { FOO } from './foo.token';
import type { Foo } from './foo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(@Inject(FOO) foo: Foo) {}

}
