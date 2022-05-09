import { TestBed } from '@angular/core/testing';

import { BasicContractService } from './contracts.service';

describe('BasicContractsService', () => {
  let service: BasicContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
