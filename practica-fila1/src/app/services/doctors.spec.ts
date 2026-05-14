import { TestBed } from '@angular/core/testing';

import { DoctorsService } from './doctors';

describe('Doctors', () => {
  let service: DoctorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
