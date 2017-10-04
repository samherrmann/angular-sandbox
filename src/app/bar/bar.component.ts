import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  @ViewChild('vc', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor() { }

  ngOnInit() { }
}
