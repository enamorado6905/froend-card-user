import { NgModule } from '@angular/core';
import { NgxStripeModule } from 'ngx-stripe';
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
import { FormatFileSizePipe } from 'src/app/pages/pipes/load/format-file-size.pipe';

import { LoadPhotoComponent } from './loadphoto/loadphoto.component';
import { AddcardComponent } from './addcard/addcard.component';
import { EditcardComponent } from './editcard/editcard.component';
import { DeletecardComponent } from './deletecard/deletecard.component';
import { DeletescardComponent } from './deletescard/deletescard.component';
import { ShowcardComponent } from './showcard/showcard.component';
import { ListcardComponent } from './listcard/listcard.component';
import { AuthCardRoutes } from './card.routing';

@NgModule({
  declarations: [
    AddcardComponent,
    EditcardComponent,
    DeletecardComponent,
    DeletescardComponent,
    ShowcardComponent,
    ListcardComponent,
    LoadPhotoComponent,
    FormatFileSizePipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthCardRoutes),
    NgxStripeModule.forRoot(
      'pk_test_51J3NjsD1bGARjoEn7vUlPlapdNgt0Clk8A5B4ZzFPm4lLY06QiKp5s2HWaVD2mP8S3conwqi8c33CvmqedYFiOES00lzuaOUGl'
    ),
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
export class CardModule {}
