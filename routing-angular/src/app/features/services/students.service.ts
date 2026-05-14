import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { StudentsInterface } from '../interfaces/students.interface';

@Injectable({
  providedIn: 'root',
})

export class StudentsService {

  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getStudents() {
    return this.http.get<StudentsInterface[]>(`${this.apiUrl}/students`);
  }

  getStudentById(id: string) {
    return this.http.get<StudentsInterface>(`${this.apiUrl}/students/${id}`);
  }

  createStudent(student: any) {
    return this.http.post(`${this.apiUrl}/students`,student);
  }

  updateStudent(id: string, student: any) { 
    return this.http.put(`${this.apiUrl}/students/${id}`,student);
  }

  deleteStudent(id: string) { 
    return this.http.delete( `${this.apiUrl}/students/${id}`);
  }

}