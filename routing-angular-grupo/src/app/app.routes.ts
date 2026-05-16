import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'chefs',
    pathMatch: 'full',
  },

  {
    path: 'chefs',
    loadChildren: () =>
      import('./features/routes/chefs-routes')
        .then(m => m.CHEFS_ROUTES),
  },

  {
    path: 'recipes',
    loadChildren: () =>
      import('./features/routes/recipes-routes')
        .then(m => m.RECIPES_ROUTES),
  },

  {
    path: '**',
    redirectTo: 'chefs'
  }

];