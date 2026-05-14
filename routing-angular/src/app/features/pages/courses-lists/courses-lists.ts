import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CoursesService } from '../../services/courses.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-courses-lists',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './courses-lists.html',
  styleUrls: ['./courses-lists.scss'],
})
export class CoursesLists {
  courses$: Observable<any[]>;

  constructor(private coursesService: CoursesService) {
    this.courses$ = this.coursesService.getCourses() as Observable<any[]>;
  }
}