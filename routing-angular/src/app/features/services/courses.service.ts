import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoursesInterface } from '../interfaces/courses.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {

  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getCourses() {
  return this.http.get<CoursesInterface[]>(`${this.apiUrl}/courses`);
}

  getCourseById(id: string) {
  return this.http.get<CoursesInterface>(`${this.apiUrl}/courses/${id}`);
}
}