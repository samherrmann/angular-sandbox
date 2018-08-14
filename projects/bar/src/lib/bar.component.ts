import { Component, OnInit } from '@angular/core';
import { BarService } from './bar.service';

@Component({
  selector: 'lib-bar',
  template: `
    <ul>
      <li *ngFor="let item of list">{{ item.x }}</li>
    </ul>
  `,
  styles: []
})
export class BarComponent implements OnInit {

  list = this.barService.list();

  constructor(private barService: BarService) {
    // If list property is set here instead of inline
    // above then the build passes.
    // this.list = this.barService.list();
  }

  ngOnInit() {
  }

}
