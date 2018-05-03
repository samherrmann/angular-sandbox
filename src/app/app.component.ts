import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isOutputEnabled = true;

  output = timer(0, 1000).pipe(this.multiplyByTwo());

  private multiplyByTwo() {
    return map<number, number>((value) => {
      console.log(value);
      return value * 2;
    });
  }

  toggleOutput(): void {
    this.isOutputEnabled = !this.isOutputEnabled;
  }
}
