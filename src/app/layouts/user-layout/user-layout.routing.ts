import { Routes } from '@angular/router';
import { WelcomeComponent } from 'src/app/pages/welcome/welcome.component';
import { InfoUserComponent } from 'src/app/pages/components/info-user/date-user.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

export const UserinLayoutRoutes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'informacion/usuario',
    component: InfoUserComponent,
  },
  {
    path: '',
    // canActivateChild: null,
    children: [
      { path: '', pathMatch: 'full' },
      {
        path: 'carros',
        loadChildren: () =>
          import(
            'src/app/pages/components/routers/entitis/card/card.module'
          ).then((m) => m.CardModule),
      },
    ],
  },
];
