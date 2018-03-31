import { Injectable, ElementRef, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DraggableService } from './draggable.service';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class TransitService implements OnDestroy {

  private readonly _width = new BehaviorSubject<number>(null);
  readonly width = this._width.asObservable();

  private readonly _height = new BehaviorSubject<number>(null);
  readonly height = this._height.asObservable();

  private draggable: ElementRef;

  private doesShadowExist = false;

  private subs: Subscription[] = [];

  constructor(private draggableService: DraggableService) { }

  register(draggable: ElementRef): void {
    this.draggable = draggable;

    this.subs.push(
      this.draggableService.dragStart.subscribe(e => {
        this.doesShadowExist = true;
        this.checkWidth();
      }),
      this.draggableService.remove.subscribe(e => {
        this.doesShadowExist = false;
        this._width.next(null);
        this._height.next(null);
      }),
      this.draggableService.insert.subscribe(e => {
        this.doesShadowExist = true;
        this.checkWidth();
      }),
      this.draggableService.dragEnd.subscribe(e => {
        this.doesShadowExist = false;
        this._width.next(null);
        this._height.next(null);
      })
    );
  }

  setHeight(value: number): void {
    this._height.next(value);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private checkWidth(): void {
    if (this.doesShadowExist) {
      this._width.next(this.clientRect().width);
      requestAnimationFrame(() => this.checkWidth());
    }
  }

  private clientRect(): ClientRect {
    return (this.draggable.nativeElement as HTMLElement).getBoundingClientRect();
  }
}
