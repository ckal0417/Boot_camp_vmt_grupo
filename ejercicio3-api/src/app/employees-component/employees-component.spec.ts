import { TestBed } from '@angular/core/testing';
import { EmployeesService } from '../services/employees';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';


describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(EmployeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});