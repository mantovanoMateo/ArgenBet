import { TestBed } from '@angular/core/testing';

import { BetPaymentService } from './bet-payment.service';

describe('BetPaymentService', () => {
  let service: BetPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
