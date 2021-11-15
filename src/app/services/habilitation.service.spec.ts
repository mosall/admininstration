import { TestBed } from '@angular/core/testing';

import { HabilitationService } from './habilitation.service';

describe('HabilitationService', () => {
  let service: HabilitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabilitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
