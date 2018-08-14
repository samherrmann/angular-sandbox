import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-foo',
  template: `
    <p>
      foo works!
    </p>
  `,
  styles: []
})
export class FooComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
