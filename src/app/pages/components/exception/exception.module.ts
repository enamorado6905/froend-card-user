import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzResultModule } from 'ng-zorro-antd/result';
import { ExceptionRoutingModule } from './exception-routing.module';

import { Exception403Component } from './403.component';
import { Exception404Component } from './404.component';
import { Exception500Component } from './500.component';
import { ExceptionTriggerComponent } from './trigger.component';

const COMPONENTS = [
  Exception403Component,
  Exception404Component,
  Exception500Component,
  ExceptionTriggerComponent,
];

@NgModule({
  imports: [
    CommonModule,
    NzButtonModule,
    NzCardModule,
    ExceptionRoutingModule,
    NzResultModule,
  ],
  declarations: [...COMPONENTS],
})
export class ExceptionModule {}
