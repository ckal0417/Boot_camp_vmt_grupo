import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable,switchMap } from 'rxjs';
import { RecipesService } from '../../services/recipes.service';
import { RecipesInterface } from '../../interfaces/recipes.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recipes-details',
  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],

  templateUrl: './recipes-details.html',
  styleUrls: ['./recipes-details.scss'],
})

export class RecipesDetails {

  recipe$: Observable<RecipesInterface>;
  loading = signal(true);
  originalOrder = () => 0;

  constructor(
    
    private route: ActivatedRoute,
    private recipesService: RecipesService

  ) {

    this.recipe$ = this.route.paramMap.pipe(
      switchMap(params => {

        const id = params.get('id')!;
        return this.recipesService.getRecipeById(id);

      })
    );

    this.recipe$.subscribe(() => {this.loading.set(false)});

  }
}