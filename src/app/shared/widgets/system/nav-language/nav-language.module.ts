import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { IconsProviderModule } from '../../../../icons-provider.module';
import { NavLanguageComponent } from './nav-language.component';

@NgModule({
  declarations: [NavLanguageComponent],
  exports: [NavLanguageComponent],
  imports: [CommonModule, IconsProviderModule, NzDropDownModule],
})
export class NavLanguageModule {}
