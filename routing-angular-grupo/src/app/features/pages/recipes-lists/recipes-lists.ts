import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipesService } from '../../services/recipes.service';
import { RecipesInterface } from '../../interfaces/recipes.interface';
import { RecipesDialogue } from '../recipes-dialogue/recipes-dialogue';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { signal } from '@angular/core';
import { RecipesForm } from '../recipes-form/recipes-form';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipes-lists',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],

  templateUrl: './recipes-lists.html',
  styleUrls: ['./recipes-lists.scss'],
})

export class RecipesLists {

  recipes$: Observable<RecipesInterface[]>;
  loading = signal(true);

  constructor(
    private recipesService: RecipesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

    this.recipes$ = this.recipesService.getRecipes();

    this.recipes$.subscribe(() => { this.loading.set(false); });

  }

  openCreateDialog() {

    const dialogRef = this.dialog.open(
      RecipesForm,
      {
        width: '500px',
        data: null
      }
    );

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {

        this.recipes$ = this.recipesService.getRecipes();

      }
    });
  }

  openEditDialog(recipe: any) {

    const dialogRef = this.dialog.open(
      RecipesForm,
      {
        width: '500px',
        data: recipe
      }
    );

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {

        this.recipes$ =
          this.recipesService.getRecipes();

      }
    });
  }

  openDeleteDialog(recipe: any) {

    const dialogRef = this.dialog.open(
      RecipesDialogue,
      {
        width: '450px',
        data: recipe
      }
    );

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {

        this.recipesService
        .deleteRecipe(recipe.id)
        .subscribe({

          next: () => {

            this.snackBar.open(
              'Recipe deleted successfully',
              'Close',
              {
                duration: 5000
              }
            );

            this.recipes$ = this.recipesService.getRecipes();

          },

          error: () => {

            this.snackBar.open(
              'Error deleting recipe',
              'Close',
              {
                duration: 7000
              }
            );
          }
        });
      }
    });
  }
}