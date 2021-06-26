import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSidebarModule } from '../widgets/system/list-sidebar/list-sidebar.module';
import { InfoUserModule } from '../widgets/user/info-user/info-user.module';
import { AppSidebarComponent } from './app-sidebar.component';
@NgModule({
  declarations: [AppSidebarComponent],
  exports: [AppSidebarComponent],
  imports: [CommonModule, ListSidebarModule, InfoUserModule],
})
export class AppSidebarModule {}
