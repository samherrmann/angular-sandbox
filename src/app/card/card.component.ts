import { Component, ContentChild, HostBinding, AfterContentInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements AfterContentInit {

  @ContentChild(RouterOutlet)
  routerOutlet: RouterOutlet;

  @HostBinding('class.activated')
  isActivated = false;

  ngAfterContentInit() {
    this.routerOutlet.activateEvents.subscribe(() => this.isActivated = true);
    this.routerOutlet.deactivateEvents.subscribe(() => this.isActivated = false);
  }

}
