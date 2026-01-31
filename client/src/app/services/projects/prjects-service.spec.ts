import { TestBed } from '@angular/core/testing';

import { PrjectsService } from './prjects-service';

describe('PrjectsService', () => {
  let service: PrjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
