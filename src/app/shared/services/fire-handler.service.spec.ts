import { TestBed } from '@angular/core/testing';

import { FireHandlerService } from './fire-handler.service';

describe('FireHandlerService', () => {
  let service: FireHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
