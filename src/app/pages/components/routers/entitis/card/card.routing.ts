import { Routes } from '@angular/router';
import { AddcardComponent } from './addcard/addcard.component';
import { EditcardComponent } from './editcard/editcard.component';
import { DeletecardComponent } from './deletecard/deletecard.component';
import { DeletescardComponent } from './deletescard/deletescard.component';
import { ShowcardComponent } from './showcard/showcard.component';
import { ListcardComponent } from './listcard/listcard.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

export const AuthCardRoutes: Routes = [
  {
    path: 'adicionar',
    component: AddcardComponent,
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
    component: ListcardComponent,
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
    component: EditcardComponent,
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
    component: DeletescardComponent,
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
    component: DeletecardComponent,
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
    component: ShowcardComponent,
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
