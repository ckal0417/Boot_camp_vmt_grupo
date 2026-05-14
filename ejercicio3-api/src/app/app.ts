import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeesComponent } from './employees-component/employees-component';
import { DepartmentsComponent } from './departments-component/departments-component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    EmployeesComponent,
    DepartmentsComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  vista: 'employees' | 'departments' = 'employees';

  mostrarEmployees() {
    this.vista = 'employees';
  }

  mostrarDepartments() {
    this.vista = 'departments';
  }
}