import { Component, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-collapse-button',
  templateUrl: './collapse-button.component.html',
  styleUrls: ['./collapse-button.component.scss']
})
export class CollapseButtonComponent {

  private isCollapsed = new BehaviorSubject(true);

  constructor() { }

  @HostListener('click', ['$event'])
  click(event: Event) {
    this.isCollapsed.next(!this.isCollapsed.getValue());
  }

  collapse(): Observable<boolean> {
    return this.isCollapsed.asObservable();
  }
}
