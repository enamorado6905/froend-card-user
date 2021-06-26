import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { OperationPollComponent } from './operation-poll.component';

@NgModule({
  declarations: [OperationPollComponent],
  exports: [OperationPollComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NzDividerModule,
    NzToolTipModule,
    IconsProviderModule,
  ],
})
export class OperationPollModule {}
