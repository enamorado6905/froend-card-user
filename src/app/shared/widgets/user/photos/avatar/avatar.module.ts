import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { AvatarComponent } from './avatar.component';
@NgModule({
  imports: [CommonModule, NzAvatarModule, NzSpinModule, IconsProviderModule],
  declarations: [AvatarComponent],
  exports: [AvatarComponent],
})
export class AvatarModule {}
