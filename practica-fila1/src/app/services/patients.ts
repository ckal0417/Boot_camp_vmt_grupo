import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patients } from '../interfaces/patients.interface';


@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private apiUrl = 'https://69fac43888a7af0ecca7bd80.mockapi.io/clinic-api/v1/patients';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Patients[]> {
    return this.http.get<Patients[]>(this.apiUrl);
  }

  getById(id: string): Observable<Patients> {
    return this.http.get<Patients>(`${this.apiUrl}/${id}`);
  }

  addPatients(patients: Partial<Patients>): Observable<Patients> {
    return this.http.post<Patients>(this.apiUrl, patients);
  }

  updatePatients(id: string, patients: Partial<Patients>): Observable<Patients> {
    return this.http.put<Patients>(`${this.apiUrl}/${id}`, patients);
  }

  deletePatients(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
