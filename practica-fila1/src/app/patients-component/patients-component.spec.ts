import { TestBed } from '@angular/core/testing';
import { PatientsService } from '../services/patients';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';


describe('PatientsService', () => {
  let service: PatientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(PatientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});