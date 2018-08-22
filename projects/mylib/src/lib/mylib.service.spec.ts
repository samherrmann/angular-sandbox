import { TestBed, inject } from '@angular/core/testing';

import { MylibService } from './mylib.service';

describe('MylibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MylibService]
    });
  });

  it('should be created', inject([MylibService], (service: MylibService) => {
    expect(service).toBeTruthy();
  }));
});
