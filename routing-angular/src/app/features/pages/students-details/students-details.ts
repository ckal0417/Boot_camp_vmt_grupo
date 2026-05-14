import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { StudentsService } from '../../services/students.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-students-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './students-details.html',
  styleUrls: ['./students-details.scss'],
})
export class StudentsDetails {

  student$: Observable<any>;

  originalOrder = () => 0;

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService
  ) {
    this.student$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')!;
        return this.studentsService.getStudentById(id);
      })
    );
  }
}