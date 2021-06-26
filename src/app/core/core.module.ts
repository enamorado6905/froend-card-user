import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiPrefixInterceptor } from './http/api-prefix.interceptor';
import { NGZORROModule } from './ng-zorro/ng-zorro.module';
import { throwIfAlreadyLoaded } from './module-import-guard';
//import { I18NService } from './i18n/i18n.service';
@NgModule({
  imports: [CommonModule, HttpClientModule, NGZORROModule],
  exports: [NGZORROModule],
  providers: [ApiPrefixInterceptor],
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
