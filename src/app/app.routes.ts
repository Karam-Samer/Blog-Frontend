import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
  { path: 'posts/:id/edit', component: FormComponent, title: 'Edit Post' },
  { path: 'posts/add', component: FormComponent, title: 'Add Post' },
];
