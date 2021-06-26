import { Routes } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';
import { ShowuserComponent } from './showuser/showuser.component';
import { ListuserComponent } from './listuser/listuser.component';
import { DeletesuserComponent } from './deletesuser/deletesuser.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

export const AuthUserRoutes: Routes = [
  {
    path: 'adicionar',
    component: AdduserComponent,
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
    component: ListuserComponent,
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
    component: EdituserComponent,
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
    path: 'eliminar',
    component: DeletesuserComponent,
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
    path: 'eliminar/:id',
    component: DeleteuserComponent,
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
    component: ShowuserComponent,
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
