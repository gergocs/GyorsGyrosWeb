import { TestBed } from '@angular/core/testing';

import { ReadFromFireService } from './readfromfire.service';

describe('ReadFromFireService', () => {
  let service: ReadFromFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadFromFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
