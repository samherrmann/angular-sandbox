import { Component } from '@angular/core';
import { timer, Observable, OperatorFunction } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isOutputEnabled = true;

  output = timer(0, 1000).pipe(
    this.map((value) => {
      console.log(value);
      return value * 2;
    })
  );

  private map<A, B>(fn: (value: A) => B): OperatorFunction<A, B> {
    return (source: Observable<A>) => {
      return new Observable<B>(observer => {
        const sub = source.subscribe((value) => {
          observer.next(fn(value));
        });

        // on unsubscibe
        return () => sub.unsubscribe();
      });
    };
  }

  toggleOutput(): void {
    this.isOutputEnabled = !this.isOutputEnabled;
  }
}
