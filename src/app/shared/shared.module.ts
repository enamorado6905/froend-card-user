import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsProviderModule } from '../icons-provider.module';
import { AppNavbarModule } from './app-navbar/app-navbar.module';
import { FooterModule } from './app-footer/footer.module';
import { AppSidebarModule } from './app-sidebar/app-sidebar.module';
import { TabSidebarModule } from './widgets/system/tab-sidebar/tab-sidebar.module';
import { ListSidebarModule } from './widgets/system/list-sidebar/list-sidebar.module';
import { DrawerSidebarModule } from './widgets/system/drawer-sidebar/drawer-sidebar.module';
import { AppBreadcrumbModule } from './app-breadcrumb/app-breadcrumb.module';
import { AppSearchModule } from './widgets/system/search/app-search/app-search.module';
import { InfoUserModule } from './widgets/user/info-user/info-user.module';
import { InfoUserNavbarModule } from './widgets/user/info-user-navbar/info-user-navbar.module';
import { NavSettingModule } from './widgets/system/nav-setting/nav-setting.module';
import { NavNotificationModule } from './widgets/system/nav-notification/nav-notification.module';
import { NavLanguageModule } from './widgets/system/nav-language/nav-language.module';
import { AvatarModule } from './widgets/user/photos/avatar/avatar.module';
import { TabBlockSeccionModule } from './widgets/system/tab-block-seccion/tab-block-seccion.module';

// components across the app
@NgModule({
  exports: [
    RouterModule,
    FooterModule,
    AppSidebarModule,
    AppNavbarModule,
    TabSidebarModule,
    AppBreadcrumbModule,
    InfoUserModule,
    InfoUserNavbarModule,
    InfoUserNavbarModule,
    NavSettingModule,
    NavNotificationModule,
    NavLanguageModule,
    AvatarModule,
    TabBlockSeccionModule,
  ],
  imports: [
    FooterModule,
    AppSidebarModule,
    AppNavbarModule,
    TabSidebarModule,
    AppBreadcrumbModule,
    InfoUserModule,
    ListSidebarModule,
    DrawerSidebarModule,
    AppSearchModule,
    InfoUserModule,
    IconsProviderModule,
    InfoUserNavbarModule,
    NavSettingModule,
    NavNotificationModule,
    NavLanguageModule,
    TabBlockSeccionModule,
  ],
})
export class SharedModule {}
