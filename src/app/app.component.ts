import { Component } from '@angular/core';
import { timer, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  output = timer(0, 1000).pipe(
    this.operator
  );

  private operator(source: Observable<number>) {
    return source;
  }
}
