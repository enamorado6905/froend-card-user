import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CheckedControlComponent } from './checked-control.component';

@NgModule({
  declarations: [CheckedControlComponent],
  exports: [CheckedControlComponent],
  imports: [CommonModule, NzCheckboxModule],
})
export class CheckedControlModule {}
