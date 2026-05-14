import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CoursesService } from '../../services/courses.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CoursesInterface } from '../../interfaces/courses.interface';
@Component({
  selector: 'app-courses-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './courses-details.html',
  styleUrls: ['./courses-details.scss'],
})
export class CoursesDetails {
  course$: Observable<CoursesInterface>;

  originalOrder = () => 0;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {
    this.course$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')!;
        return this.coursesService.getCourseById(id);
      })
    );
  }
}