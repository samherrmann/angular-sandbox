import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureChildComponent } from './feature-child.component';

describe('FeatureChildComponent', () => {
  let component: FeatureChildComponent;
  let fixture: ComponentFixture<FeatureChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
