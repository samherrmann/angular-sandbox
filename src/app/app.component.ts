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

  private map(fn: (value: number) => number): OperatorFunction<number, number> {
    return (source: Observable<number>) => {
      return new Observable<number>(observer => {
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
