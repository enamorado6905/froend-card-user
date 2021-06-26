import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NGZORROModule } from 'src/app/core/ng-zorro/ng-zorro.module';
import { IconsProviderModule } from '../../../../icons-provider.module';
import { TranslateModule } from '@ngx-translate/core';
import { SigninComponent } from './signin.component';
import { SigninADMComponent } from '../singingADM/singinADM.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconsProviderModule,
    TranslateModule,
    NGZORROModule,
  ],
  declarations: [SigninComponent, SigninADMComponent],
  exports: [SigninComponent, SigninADMComponent],
})
export class SigninModule {}
