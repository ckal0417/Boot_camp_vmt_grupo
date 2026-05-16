import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipesInterface } from '../interfaces/recipes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class RecipesService {

  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getRecipes() {

    return this.http.get<RecipesInterface[]>(
      `${this.apiUrl}/recipes`
    );

  }

  getRecipeById(id: string) {

    return this.http.get<RecipesInterface>(
      `${this.apiUrl}/recipes/${id}`
    );

  }

  createRecipe(recipe: any) {

    return this.http.post(
      `${this.apiUrl}/recipes`,
      recipe
    );

  }

  updateRecipe(id: string, recipe: any) {

    return this.http.put(
      `${this.apiUrl}/recipes/${id}`,
      recipe
    );

  }

  deleteRecipe(id: string) {

    return this.http.delete(
      `${this.apiUrl}/recipes/${id}`
    );

  }

}