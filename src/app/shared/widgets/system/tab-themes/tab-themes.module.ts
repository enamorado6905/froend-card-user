import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsProviderModule } from '../../../../icons-provider.module';
import { TabThemesComponent } from './tab-themes.component';

@NgModule({
  declarations: [TabThemesComponent],
  exports: [TabThemesComponent],
  imports: [CommonModule, IconsProviderModule],
})
export class TabThemesModule {}
