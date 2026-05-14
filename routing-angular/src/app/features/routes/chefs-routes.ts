import { Routes } from '@angular/router';
import { StudentsLists } from '../pages/students-lists/students-lists';
import { StudentsDetails } from '../pages/students-details/students-details';
import { StudentsForm } from '../pages/students-form/students-form';

export const STUDENTS_ROUTES: Routes = [
  {
    path: '',
    component: StudentsLists,
  },

  {
    path: 'create',
    component: StudentsForm,
  },

  {
    path: 'edit/:id',
    component: StudentsForm,
  },

  {
    path: ':id',
    component: StudentsDetails,
  },

];