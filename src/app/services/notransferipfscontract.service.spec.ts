import { TestBed } from '@angular/core/testing';

import { NotransferipfscontractService } from './notransferipfscontract.service';

describe('NotransferipfscontractService', () => {
  let service: NotransferipfscontractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotransferipfscontractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
