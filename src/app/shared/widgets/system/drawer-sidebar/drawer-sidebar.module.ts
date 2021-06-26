import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { ListSidebarModule } from '../list-sidebar/list-sidebar.module';
import { InfoUserModule } from '../../user/info-user/info-user.module';
import { DrawerSidebarComponent } from './drawer-sidebar.component';

@NgModule({
  declarations: [DrawerSidebarComponent],
  exports: [DrawerSidebarComponent],
  imports: [
    CommonModule,
    NzDrawerModule,
    IconsProviderModule,
    ListSidebarModule,
    InfoUserModule,
  ],
})
export class DrawerSidebarModule {}
