import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctors } from '../interfaces/doctors.interface';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  private apiUrl = 'https://69fac43888a7af0ecca7bd80.mockapi.io/clinic-api/v1/doctors';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Doctors[]> {
    return this.http.get<Doctors[]>(this.apiUrl);
  }

  getById(id: string): Observable<Doctors> {
    return this.http.get<Doctors>(`${this.apiUrl}/${id}`);
  }

  addDoctors(doctors: Partial<Doctors>): Observable<Doctors> {
    return this.http.post<Doctors>(this.apiUrl, doctors);
  }

  updateDoctors(id: string, doctors: Partial<Doctors>): Observable<Doctors> {
    return this.http.put<Doctors>(`${this.apiUrl}/${id}`, doctors);
  }

  deleteDoctors(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}