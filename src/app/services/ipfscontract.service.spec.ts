import { TestBed } from '@angular/core/testing';

import { IpfscontractService } from './ipfscontract.service';

describe('IpfscontractService', () => {
  let service: IpfscontractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpfscontractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
