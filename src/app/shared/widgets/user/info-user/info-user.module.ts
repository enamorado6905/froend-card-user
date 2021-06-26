import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { TranslateModule } from '@ngx-translate/core';
import { IconsProviderModule } from '../../../../icons-provider.module';
import { AvatarModule } from '../photos/avatar/avatar.module';
import { InfoUserComponent } from './info-user.component';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    NzDropDownModule,
    IconsProviderModule,
    AvatarModule,
    NzSkeletonModule,
    TranslateModule,
    RouterModule,
  ],
  declarations: [InfoUserComponent],
  exports: [InfoUserComponent],
})
export class InfoUserModule {}
