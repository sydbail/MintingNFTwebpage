import { TestBed } from '@angular/core/testing';

import { NotransfercontractService } from './notransfercontract.service';

describe('NotransfercontractService', () => {
  let service: NotransfercontractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotransfercontractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
