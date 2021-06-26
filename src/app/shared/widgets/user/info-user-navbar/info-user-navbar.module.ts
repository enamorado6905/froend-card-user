import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { IconsProviderModule } from '../../../../icons-provider.module';
import { InfoUserNavbarComponent } from './info-user-navbar.component';

@NgModule({
  declarations: [InfoUserNavbarComponent],
  exports: [InfoUserNavbarComponent],
  imports: [
    CommonModule,
    NzAvatarModule,
    IconsProviderModule,
    NzDropDownModule,
  ],
})
export class InfoUserNavbarModule {}
