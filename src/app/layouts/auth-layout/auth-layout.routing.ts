import { Routes } from '@angular/router';
import { SigninComponent } from 'src/app/pages/components/auth/signin/signin.component';
export const AuthLayoutRoutes: Routes = [
  { path: 'login', component: SigninComponent },
];
