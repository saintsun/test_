/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserAuthorizationService } from './user-authorization.service';

describe('Service: UserAuthorization', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAuthorizationService]
    });
  });

  it('should ...', inject([UserAuthorizationService], (service: UserAuthorizationService) => {
    expect(service).toBeTruthy();
  }));
});
