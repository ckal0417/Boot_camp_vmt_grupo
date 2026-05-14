import { Routes } from '@angular/router';
import { CoursesLists } from '../pages/courses-lists/courses-lists';
import { CoursesDetails } from '../pages/courses-details/courses-details';

export const COURSES_ROUTES: Routes = [
  {
    path: '',
    component: CoursesLists,
  },
  {
    path: ':id',
    component: CoursesDetails,
  },
];