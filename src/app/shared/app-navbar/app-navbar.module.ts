import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AppSearchModule } from '../widgets/system/search/app-search/app-search.module';
import { DrawerSidebarModule } from '../widgets/system/drawer-sidebar/drawer-sidebar.module';
import { TabSidebarModule } from '../widgets/system/tab-sidebar/tab-sidebar.module';
import { TabThemesModule } from '../widgets/system/tab-themes/tab-themes.module';
import { NavNotificationModule } from '../widgets/system/nav-notification/nav-notification.module';
import { NavSettingModule } from '../widgets/system/nav-setting/nav-setting.module';
import { NavLanguageModule } from '../widgets/system/nav-language/nav-language.module';
import { IconsProviderModule } from '../../icons-provider.module';
import { TabBlockSeccionModule } from '../widgets/system/tab-block-seccion/tab-block-seccion.module';
import { InfoUserModule } from '../widgets/user/info-user/info-user.module';
import { AppNavbarComponent } from './app-navbar.component';

@NgModule({
  declarations: [AppNavbarComponent],
  exports: [AppNavbarComponent],
  imports: [
    CommonModule,
    DrawerSidebarModule,
    TabSidebarModule,
    TabThemesModule,
    AppSearchModule,
    IconsProviderModule,
    NavNotificationModule,
    NavSettingModule,
    NavLanguageModule,
    TabBlockSeccionModule,
    NzToolTipModule,
    TranslateModule,
    InfoUserModule,
  ],
})
export class AppNavbarModule {}
