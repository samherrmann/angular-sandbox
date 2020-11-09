import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-mylib',
  template: `
    <p>
      mylib works!
    </p>
    <lib-mylib2></lib-mylib2>
  `,
  styles: [
  ]
})
export class MylibComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
