import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { RouterModule, Routes } from '@angular/router';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';
import { OneModule } from './one/one.module';
import { TwoModule } from './two/two.module';

const routes: Routes = [{
  path: 'one',
  component: OneComponent
}, {
  path: 'two',
  component: TwoComponent
}];

@NgModule({
  imports: [
    BrowserModule,
    ScullyLibModule,
    RouterModule.forRoot(routes),
    OneModule,
    TwoModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
