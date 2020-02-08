import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BarModule } from '../bar/bar.module';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.scss'],

})
export class FooComponent { }

@NgModule({
  imports: [BarModule],
  declarations: [FooComponent]
})
export class FooModule { }
