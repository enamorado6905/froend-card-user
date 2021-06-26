import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsProviderModule } from '../../../../icons-provider.module';
import { TabSidebarComponent } from './tab-sidebar';

@NgModule({
  declarations: [TabSidebarComponent],
  exports: [TabSidebarComponent],
  imports: [CommonModule, IconsProviderModule],
})
export class TabSidebarModule {}
