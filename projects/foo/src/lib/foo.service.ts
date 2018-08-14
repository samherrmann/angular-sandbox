import { Injectable } from '@angular/core';
import { BarService } from 'bar';
import { FooItem } from './types';

@Injectable({
  providedIn: 'root'
})
export class FooService {

  constructor(private barService: BarService) { }

  init(foo: FooItem): void {
    this.barService.add(foo);
  }
}
