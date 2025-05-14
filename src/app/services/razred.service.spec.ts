import { TestBed } from '@angular/core/testing';

import { RazredService } from './razred.service';

describe('RazredService', () => {
  let service: RazredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RazredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
