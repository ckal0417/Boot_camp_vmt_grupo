import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-students-form',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],

  templateUrl: './students-form.html',
  styleUrls: ['./students-form.scss'],
})

export class StudentsForm implements OnInit {

  studentId: string | null = null;
  studentForm;

  constructor (
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.studentForm = this.fb.group ({
      name: ['', Validators.required],
      email: ['', Validators.required],
      avatar: ['']
    });

    this.studentId = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {

    // EDIT
    if (this.studentId) {

      this.studentsService.getStudentById(this.studentId)
      .subscribe((student: any) => {

        this.studentForm.patchValue ({
          name: student.name,
          email: student.email,
          avatar: student.avatar
        });

      });

    }
  }

  save() {

    if (this.studentForm.invalid) return;

    const studentData = this.studentForm.value;

    // CREATE
    if (!this.studentId) {

      this.studentsService.createStudent(studentData)
      .subscribe (() => {

        console.log('Student created');

        this.router.navigate(['/students']);

      });

    }

    // UPDATE
    else {

      this.studentsService.updateStudent(
        this.studentId,
        studentData
      )
      .subscribe(() => {

        console.log('Student updated');

        this.router.navigate(['/students']);

      });

    }
  }

  cancel() {
    this.router.navigate(['/students']);
  }
}