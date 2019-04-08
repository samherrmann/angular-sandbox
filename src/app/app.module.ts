import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CardModule } from './card/card.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CardModule,
    RouterModule.forRoot([{
      path: 'one',
      loadChildren: './one/one.module#OneModule'
    }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
