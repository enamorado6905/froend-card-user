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
    canActivate: [NgxPermissionsGuard],
  },
  /*  {
    path: 'gestion',
    // canActivateChild: null,
    children: [
      { path: '', pathMatch: 'full' },
      {
        path: 'adm',
        loadChildren: () =>
          import(
            'src/app/pages/components/routers/entitis/useradm/useradm.module'
          ).then((m) => m.UseradmModule),
      },
      {
        path: 'usuario',
        loadChildren: () =>
          import(
            'src/app/pages/components/routers/entitis/user/user.module'
          ).then((m) => m.UserModule),
      },
      {
        path: 'carro',
        loadChildren: () =>
          import(
            'src/app/pages/components/routers/entitis/card/card.module'
          ).then((m) => m.CardModule),
      },
    ],
  },*/
];
