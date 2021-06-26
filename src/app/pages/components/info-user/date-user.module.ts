import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { TranslateModule } from '@ngx-translate/core';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { AvatarModule } from 'src/app/shared/widgets/user/photos/avatar/avatar.module';
import { InfoUserComponent } from './date-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzGridModule,
    NzSpaceModule,
    NzCardModule,
    NzFormModule,
    TranslateModule,
    NzInputModule,
    NzButtonModule,
    IconsProviderModule,
    NzPopoverModule,
    NzProgressModule,
    AvatarModule,
    NzUploadModule,
    NzDividerModule,
    NzTypographyModule,
    RouterModule,
  ],
  declarations: [InfoUserComponent],
})
export class InfoUserModule {}
