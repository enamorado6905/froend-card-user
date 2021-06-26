import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { IconsProviderModule } from '../../../../icons-provider.module';
import { NavNotificationComponent } from './nav-notification.component';

@NgModule({
  declarations: [NavNotificationComponent],
  exports: [NavNotificationComponent],
  imports: [CommonModule, IconsProviderModule, NzDropDownModule],
})
export class NavNotificationModule {}
