import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NGZORROModule } from 'src/app/core/ng-zorro/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarModule } from 'src/app/shared/widgets/user/photos/avatar/avatar.module';
import { OperationModule } from 'src/app/shared/widgets/system/listEntitis/operation/operation.module';
import { PaginationModule } from 'src/app/shared/widgets/system/pagination/pagination.module';
import { CheckedControlModule } from 'src/app/shared/widgets/system/checked-control/checked-control.module';

import { AdduserComponent } from './adduser/adduser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ShowuserComponent } from './showuser/showuser.component';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';
import { ListuserComponent } from './listuser/listuser.component';
import { DeletesuserComponent } from './deletesuser/deletesuser.component';
import { AuthUserRoutes } from './user.routing';
@NgModule({
  declarations: [
    AdduserComponent,
    EdituserComponent,
    ShowuserComponent,
    DeleteuserComponent,
    ListuserComponent,
    DeletesuserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthUserRoutes),
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
export class UserModule {}
