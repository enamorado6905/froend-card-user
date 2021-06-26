import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TranslateModule } from '@ngx-translate/core';
import { GenderSelectComponent } from './gender.component';
import { GendersSelectsComponent } from './genders.component';
@NgModule({
  declarations: [GenderSelectComponent, GendersSelectsComponent],
  exports: [GenderSelectComponent, GendersSelectsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class GenderSelectModule {}
