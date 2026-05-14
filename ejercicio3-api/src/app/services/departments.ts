import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../interfaces/departments.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  private apiUrl = 'https://69f83bd3dd0c226688ee46dc.mockapi.io/api/v1/departments';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  getById(id: string): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`);
  }

  addDepartment(department: any) {
    return this.http.post(this.apiUrl, department);
  }

  updateDepartment(id: string, department: any) {
    return this.http.put(`${this.apiUrl}/${id}`, department);
  }

  deleteDepartment(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}