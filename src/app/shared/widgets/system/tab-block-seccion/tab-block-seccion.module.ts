import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabBlockSeccionComponent } from './tab-block-seccion.component';
import { IconsProviderModule } from '../../../../icons-provider.module';

@NgModule({
  declarations: [TabBlockSeccionComponent],
  exports: [TabBlockSeccionComponent],
  imports: [CommonModule, IconsProviderModule],
})
export class TabBlockSeccionModule {}
