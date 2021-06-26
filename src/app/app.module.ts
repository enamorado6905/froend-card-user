import { NgModule } from '@angular/core';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';

import { GlobalModule } from './global/global.module';
import { CoreModule } from './core/index';

import { SharedModule } from './shared/index';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';

import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { IconsProviderModule } from './icons-provider.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, UserLayoutComponent, AuthLayoutComponent],
  imports: [
    GlobalModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    StoreModule,
    IconsProviderModule,
    BrowserAnimationsModule,
    StoreDevtoolsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.CONTACT_PRODUCTION,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
