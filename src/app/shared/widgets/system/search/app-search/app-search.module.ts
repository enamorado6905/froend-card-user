import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { IconsProviderModule } from '../../../../../icons-provider.module';
import { AppSearchComponent } from './app-search.component';

@NgModule({
  declarations: [AppSearchComponent],
  exports: [AppSearchComponent],
  imports: [CommonModule, NzInputModule, IconsProviderModule, NzDrawerModule],
})
export class AppSearchModule {}
