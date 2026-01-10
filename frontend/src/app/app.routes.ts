import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/home/home';
import { InstitutionList } from './components/institution-list/institution-list';
import { InstitutionForm } from './components/institution-form/institution-form';
import { CourseList } from './components/course-list/course-list';
import { CourseForm } from './components/course-form/course-form';
import { Login } from './components/login/login';
import { About } from './components/about/about';
import { ContactUs } from './components/contact-us/contact-us';
import { CourseDetails } from './components/course-list/course-details/course-details';
import { InstitutionDetails } from './components/institution-list/institution-details/institution-details';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'institutions', component: InstitutionList },
  { path: 'institutions/add', component: InstitutionForm },
  { path: 'institutions/edit/:id', component: InstitutionForm },
  { path: 'institutions/:id', component: InstitutionDetails },
  { path: 'courses', component: CourseList },
  { path: 'about', component: About },
  { path: 'contact-us', component: ContactUs },
   { path: 'login', component: Login },
  { path: 'courses/add', component: CourseForm },
  { path: 'courses/edit/:id', component: CourseForm },
   { path: 'courses/:id', component: CourseDetails },
  { path: '**', redirectTo: '' }
];



