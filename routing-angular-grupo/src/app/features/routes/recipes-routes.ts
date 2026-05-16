import { Routes } from '@angular/router';
import { RecipesLists } from '../pages/recipes-lists/recipes-lists';
import { RecipesDetails } from '../pages/recipes-details/recipes-details';
import { RecipesForm } from '../pages/recipes-form/recipes-form';
export const RECIPES_ROUTES: Routes = [

  {
    path: '',
    component: RecipesLists,
  },

  {
    path: 'create',
    component: RecipesForm,
  },

  {
    path: 'edit/:id',
    component: RecipesForm,
  },

  {
    path: ':id',
    component: RecipesDetails,
  },

];