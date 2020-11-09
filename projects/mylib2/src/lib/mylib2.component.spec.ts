import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mylib2Component } from './mylib2.component';

describe('Mylib2Component', () => {
  let component: Mylib2Component;
  let fixture: ComponentFixture<Mylib2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Mylib2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Mylib2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
