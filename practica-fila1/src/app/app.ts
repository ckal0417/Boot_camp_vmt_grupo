import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientsComponent } from "./patients-component/patients-component";
import { DoctorsComponent } from "./doctors-component/doctors-component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    PatientsComponent, 
    DoctorsComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  vista: 'patients' | 'doctors' = 'patients';

  mostrarPatients() {
    this.vista = 'patients';
  }

  mostrarDoctors() {
    this.vista = 'doctors';
  }
}