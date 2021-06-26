import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { TranslateModule } from '@ngx-translate/core';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { ListSidebarComponent } from './list-sidebar.component';

@NgModule({
  declarations: [ListSidebarComponent],
  exports: [ListSidebarComponent],
  imports: [
    TranslateModule,
    CommonModule,
    NzMenuModule,
    RouterModule,
    IconsProviderModule,
  ],
})
export class ListSidebarModule {}
