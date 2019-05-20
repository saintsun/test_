import { TestBed } from '@angular/core/testing';

import { SafetyCultureAttachmentService } from './safety-culture-attachment.service';

describe('SafetyCultureAttachmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SafetyCultureAttachmentService = TestBed.get(SafetyCultureAttachmentService);
    expect(service).toBeTruthy();
  });
});
