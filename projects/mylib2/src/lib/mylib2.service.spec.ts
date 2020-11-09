import { TestBed } from '@angular/core/testing';

import { Mylib2Service } from './mylib2.service';

describe('Mylib2Service', () => {
  let service: Mylib2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mylib2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
