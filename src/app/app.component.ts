import { Component, ElementRef } from '@angular/core';
import { Viewer } from 'cesium';

// tslint:disable-next-line: no-string-literal
window['CESIUM_BASE_URL'] = '/assets/cesium/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  readonly viewer: Viewer;

  constructor(private host: ElementRef<HTMLElement>) {
    this.viewer = new Viewer(this.host.nativeElement);
  }
}
