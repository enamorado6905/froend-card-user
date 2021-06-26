import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { VerifyTokenGuard } from './pages/auth/token/verify_TOKEN.guard';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    canActivate: [VerifyTokenGuard],
    canActivateChild: [VerifyTokenGuard],
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('./layouts/user-layout/user-layout.module').then(
            (m) => m.UserLayoutModule
          ),
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/auth-layout/auth-layout.module').then(
            (m) => m.AuthLayoutModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollOffset: [0, 0],
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
