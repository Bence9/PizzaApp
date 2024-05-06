import { TestBed } from '@angular/core/testing';

import { OvenServiceService } from './oven-service.service';

describe('OvenServiceService', () => {
  let service: OvenServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OvenServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
