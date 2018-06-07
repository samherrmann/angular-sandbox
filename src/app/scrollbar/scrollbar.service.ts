import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollbarService {

  readonly width: number;

  constructor() {
    this.width = this.measureWidth();
  }

  private measureWidth(): number {
    const el = document.createElement('div');
    el.setAttribute('style', `position: fixed; overflow: scroll;`);
    document.body.appendChild(el);
    const width = el.offsetWidth - el.clientWidth;
    el.remove();
    return width;
  }
}
