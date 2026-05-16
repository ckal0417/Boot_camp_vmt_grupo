import { Routes } from '@angular/router';
import { ChefsLists } from '../pages/chefs-lists/chefs-lists';
import { ChefsDetails } from '../pages/chefs-details/chefs-details';
import { ChefsForm } from '../pages/chefs-form/chefs-form';

export const CHEFS_ROUTES: Routes = [

  {
    path: '',
    component: ChefsLists,
  },

  {
    path: 'create',
    component: ChefsForm,
  },

  {
    path: 'edit/:id',
    component: ChefsForm,
  },

  {
    path: ':id',
    component: ChefsDetails,
  },

];