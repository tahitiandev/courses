import { TestBed } from '@angular/core/testing';

import { UtilisteursService } from './utilisateurs.service';

describe('UtilisteursService', () => {
  let service: UtilisteursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilisteursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
