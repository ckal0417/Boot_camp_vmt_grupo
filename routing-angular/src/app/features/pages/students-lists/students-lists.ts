import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentsService } from '../../services/students.service';
import { StudentsInterface } from '../../interfaces/students.interface';
import { StudentsDialogue } from '../students-dialogue/students-dialogue';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-students-lists',
  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule
  ],

  templateUrl: './students-lists.html',
  styleUrls: ['./students-lists.scss'],
})

export class StudentsLists {

  students$: Observable<StudentsInterface[]>;

  constructor(
    private studentsService: StudentsService,
    private dialog: MatDialog
  ) {

    this.students$ = this.studentsService.getStudents();

  }

  deleteStudent(id: string) {

    const dialogRef = this.dialog.open(
      StudentsDialogue,
      {
        width: '450px'
      }
    );

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {

        this.studentsService.deleteStudent(id).subscribe(() => {

          console.log('Student deleted');
          window.location.reload();

        });
      }
    });

  }

}