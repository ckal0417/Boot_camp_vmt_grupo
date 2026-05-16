import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ChefsService } from '../../services/chefs.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chefs-form',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule
  ],

  templateUrl: './chefs-form.html',
  styleUrls: ['./chefs-form.scss'],
})

export class ChefsForm implements OnInit {

  chefId: string | null = null;
  chefForm;

  constructor(

    private fb: FormBuilder,
    private chefsService: ChefsService,
    public dialogRef: MatDialogRef<ChefsForm>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private snackBar: MatSnackBar,
  ){

    this.chefForm = this.fb.group({

      name: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      gender: ['', Validators.required]

    });

    this.chefId = this.data?.id || null;

  }

  ngOnInit(): void {

    // EDIT
    if (this.chefId) {

      this.chefForm.patchValue({

        name: this.data.name,
        country: this.data.country,
        city: this.data.city,
        gender: this.data.gender

      });
    }
  }

  save() {

    if (this.chefForm.invalid) return;

    const chefData = this.chefForm.value;

    // CREATE
    if (!this.chefId) {

      this.chefsService
      .createChef(chefData)
      .subscribe({

        next: () => {

          this.snackBar.open(
            'Chef created successfully',
            'Close',
            {
              duration: 7000
            }
          );

          setTimeout(() => {

            this.dialogRef.close(true);

          }, 1000);
        },

        error: () => {

          this.snackBar.open(
            'Error creating chef',
            'Close',
            {
              duration: 7000
            }
          );
        }
      });
    }

    // UPDATE
    else {

      this.chefsService
      .updateChef(
        this.chefId,
        chefData
      )
      .subscribe({

        next: () => {

          this.snackBar.open(
            'Chef updated successfully',
            'Close',
            {
              duration: 7000
            }
          );

          setTimeout(() => {

            this.dialogRef.close(true);

          }, 1000);

        },

        error: () => {

          this.snackBar.open(
            'Error updating chef',
            'Close',
            {
              duration: 7000
            }
          );
        }
      });
    }
  }

  cancel() {

    this.dialogRef.close();

  }

}