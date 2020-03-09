import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideFooExtension } from './foo/foo-extension';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideFooExtension(() => import('./foo/foo.component').then(mod => mod.FooComponent))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
