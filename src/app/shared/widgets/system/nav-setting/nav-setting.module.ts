import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { IconsProviderModule } from '../../../../icons-provider.module';
import { NavSettingComponent } from './nav-setting.component';

@NgModule({
  declarations: [NavSettingComponent],
  exports: [NavSettingComponent],
  imports: [CommonModule, IconsProviderModule, NzDropDownModule],
})
export class NavSettingModule {}
