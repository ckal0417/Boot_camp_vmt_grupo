import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RecipesService } from '../../services/recipes.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({

  selector: 'app-recipes-form',
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

  templateUrl: './recipes-form.html',
  styleUrls: ['./recipes-form.scss'],
})

export class RecipesForm implements OnInit {

  recipeId: string | null = null;
  recipeForm;

  constructor(

    private fb: FormBuilder,
    private recipesService: RecipesService,
    public dialogRef: MatDialogRef<RecipesForm>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private snackBar: MatSnackBar

  ) {

    this.recipeForm = this.fb.group({

      name: ['', Validators.required],
      description: ['', Validators.required],
      country: ['', Validators.required]

    });

    this.recipeId = this.data?.id || null;

  }

  ngOnInit(): void {

    if (this.recipeId) {

      this.recipeForm.patchValue({

        name: this.data.name,
        description: this.data.description,
        country: this.data.country

      });
    }
  }

  save() {

    if (this.recipeForm.invalid) return;

    const recipeData = this.recipeForm.value;

    // CREATE
    if (!this.recipeId) {

      this.recipesService
      .createRecipe(recipeData)
      .subscribe({

        next: () => {

          this.snackBar.open(
            'Recipe created successfully',
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
            'Error creating recipe',
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

      this.recipesService
      .updateRecipe(
        this.recipeId,
        recipeData
      )
      .subscribe({

        next: () => {

          this.snackBar.open(
            'Recipe updated successfully',
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
            'Error updating recipe',
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