import { TestBed } from '@angular/core/testing';

import { FooService } from './foo.service';

describe('FooService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FooService = TestBed.get(FooService);
    expect(service).toBeTruthy();
  });
});
