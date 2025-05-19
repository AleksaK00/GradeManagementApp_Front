import { TestBed } from '@angular/core/testing';

import { AutentifikacijaService } from './autentifikacija.service';

describe('AutentifikacijaService', () => {
  let service: AutentifikacijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutentifikacijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
