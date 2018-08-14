import { TestBed, inject } from '@angular/core/testing';

import { FooService } from './foo.service';

describe('FooService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FooService]
    });
  });

  it('should be created', inject([FooService], (service: FooService) => {
    expect(service).toBeTruthy();
  }));
});
