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
        .then(m => m.STUDENTS_ROUTES),
  },

  {
    path: 'recipes',
    loadChildren: () =>
      import('./features/routes/recipes-routes')
        .then(m => m.COURSES_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'chefs'
    }
];