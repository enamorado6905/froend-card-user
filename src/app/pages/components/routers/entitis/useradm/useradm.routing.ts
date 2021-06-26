import { Routes } from '@angular/router';
import { AdduseradmComponent } from './adduseradm/adduseradm.component';
import { EdituseradmComponent } from './edituseradm/edituseradm.component';
import { DeleteuseradmComponent } from './deleteuseradm/deleteuseradm.component';
import { DeletesuseradmComponent } from './deletesuseradm/deletesuseradm.component';
import { ShowuseradmComponent } from './showuseradm/showuseradm.component';
import { ListuseradmComponent } from './listuseradm/listuseradm.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
export const AuthUseradmRoutes: Routes = [
  {
    path: 'adicionar',
    component: AdduseradmComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['ADM'],
        redirectTo: '/403',
      },
    },
  },
  {
    path: 'listado',
    component: ListuseradmComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['ADM'],
        redirectTo: '/403',
      },
    },
  },
  {
    path: 'editar/:id',
    component: EdituseradmComponent,
    canActivate: [NgxPermissionsGuard],
    outlet: 'drawer',
    data: {
      permissions: {
        only: ['ADM'],
        redirectTo: '/403',
      },
    },
  },
  {
    path: 'eliminar/:id',
    component: DeleteuseradmComponent,
    canActivate: [NgxPermissionsGuard],
    outlet: 'modal',
    data: {
      permissions: {
        only: ['ADM'],
        redirectTo: '/403',
      },
    },
  },
  {
    path: 'eliminar',
    component: DeletesuseradmComponent,
    canActivate: [NgxPermissionsGuard],
    outlet: 'modal',
    data: {
      permissions: {
        only: ['ADM'],
        redirectTo: '/403',
      },
    },
  },
  {
    path: 'mostrar/:id',
    component: ShowuseradmComponent,
    canActivate: [NgxPermissionsGuard],
    outlet: 'drawer',
    data: {
      permissions: {
        only: ['ADM'],
        redirectTo: '/403',
      },
    },
  },
];
