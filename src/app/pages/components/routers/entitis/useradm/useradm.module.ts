import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NGZORROModule } from 'src/app/core/ng-zorro/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarModule } from 'src/app/shared/widgets/user/photos/avatar/avatar.module';
import { OperationModule } from 'src/app/shared/widgets/system/listEntitis/operation/operation.module';
import { PaginationModule } from 'src/app/shared/widgets/system/pagination/pagination.module';
import { CheckedControlModule } from 'src/app/shared/widgets/system/checked-control/checked-control.module';

import { AuthUseradmRoutes } from './useradm.routing';
import { AdduseradmComponent } from './adduseradm/adduseradm.component';
import { EdituseradmComponent } from './edituseradm/edituseradm.component';
import { ListuseradmComponent } from './listuseradm/listuseradm.component';
import { ShowuseradmComponent } from './showuseradm/showuseradm.component';
import { DeleteuseradmComponent } from './deleteuseradm/deleteuseradm.component';
import { DeletesuseradmComponent } from './deletesuseradm/deletesuseradm.component';

@NgModule({
  declarations: [
    ShowuseradmComponent,
    ListuseradmComponent,
    DeleteuseradmComponent,
    AdduseradmComponent,
    EdituseradmComponent,
    DeletesuseradmComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthUseradmRoutes),
    NGZORROModule,
    FormsModule,
    AvatarModule,
    OperationModule,
    PaginationModule,
    CheckedControlModule,
    ReactiveFormsModule,
    TranslateModule,
    IconsProviderModule,
  ],
})
export class UseradmModule {}
