import { TestBed } from '@angular/core/testing';

import { WriteToFireService } from './write-to-fire.service';

describe('WriteToFireService', () => {
  let service: WriteToFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WriteToFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
