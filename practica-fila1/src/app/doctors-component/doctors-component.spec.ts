import { TestBed } from '@angular/core/testing';
import { DoctorsService } from '../services/doctors';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';


describe('DoctorsService', () => {
  let service: DoctorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(DoctorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});