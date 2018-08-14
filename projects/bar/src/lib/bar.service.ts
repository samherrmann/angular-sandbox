import { Injectable } from '@angular/core';
import { List, Item } from './types';

@Injectable({
  providedIn: 'root'
})
export class BarService {

  private _list: List = [];

  constructor() { }

  add(item: Item): void {
    this._list.push(item);
  }

  list(): List {
    return this._list;
  }
}
