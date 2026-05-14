import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full',
  },

  {
    path: 'students',
    loadChildren: () =>
      import('./features/routes/students-routes')
        .then(m => m.STUDENTS_ROUTES),
  },

  {
    path: 'courses',
    loadChildren: () =>
      import('./features/routes/courses-routes')
        .then(m => m.COURSES_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'students'
    }
];