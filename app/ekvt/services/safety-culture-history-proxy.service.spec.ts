import { TestBed } from '@angular/core/testing';

import { SafetyCultureHistoryProxyService } from './safety-culture-history-proxy.service';

describe('SafetyCultureHistoryProxyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SafetyCultureHistoryProxyService = TestBed.get(SafetyCultureHistoryProxyService);
    expect(service).toBeTruthy();
  });
});
