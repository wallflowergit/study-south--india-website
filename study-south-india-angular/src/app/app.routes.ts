import { Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses';

export const routes: Routes = [
   
  { path: '', component: CoursesComponent },
  { path: '**', redirectTo: '' }
];

