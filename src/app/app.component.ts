import { Component } from '@angular/core';
import { timer, Observable, OperatorFunction } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  output = timer(0, 1000).pipe(
    this.operatorFactory()
  );

  private operatorFactory(): OperatorFunction<number, number> {
    return this.operator;
  }

  private operator(source: Observable<number>) {
    return new Observable<number>((observer => {
      source.subscribe((value) => {
        console.log(value);
        observer.next(value);
      });
    }));
  }
}
