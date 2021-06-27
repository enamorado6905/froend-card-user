import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfoUserModule } from 'src/app/pages/components/info-user/date-user.module';
import { WelcomeModule } from 'src/app/pages/welcome/welcome.module';
import { CardModule } from 'src/app/pages/components/routers/entitis/card/card.module';
import { ExceptionModule } from 'src/app/pages/components/exception/exception.module';

import { UserinLayoutRoutes } from './user-layout.routing';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserinLayoutRoutes),
    ExceptionModule,
    InfoUserModule,
    WelcomeModule,
    CardModule,
  ],
})
export class UserLayoutModule {}
