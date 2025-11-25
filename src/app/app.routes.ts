import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'contact', 
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent)
  },
  { path: '**', redirectTo: '' }
];

