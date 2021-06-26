import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import {
  HttpClientModule,
  HttpClientJsonpModule,
  HttpClient,
} from '@angular/common/http';

// #region default language
// https://ng-alain.com/docs/i18n
import { default as ngLang } from '@angular/common/locales/es-CU';
import { es as dateLang } from 'date-fns/locale';
import { registerLocaleData } from '@angular/common';

import {
  NZ_DATE_LOCALE,
  NZ_I18N,
  es_ES as zorroLang,
} from 'ng-zorro-antd/i18n';
const LANG = {
  abbr: 'ES',
  ng: ngLang,
  zorro: zorroLang,
  date: dateLang,
  delon: '',
};
// register angular
registerLocaleData(LANG.ng, LANG.abbr);
const LANG_PROVIDES = [
  { provide: NZ_I18N, useValue: LANG.zorro },
  { provide: NZ_DATE_LOCALE, useValue: LANG.date },
];
// #endregion

// #region Provide
import {
  APPINIT_Theme_System,
  APPINIT_Conf_NZ_ZORRO,
  APPINIT_Inf_Divice,
  APPINIT_Interceptor_Token,
  APPINIT_Authorization,
} from '../core/app-initializer.service';

// #endregion

// #region I18n
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import es from '@angular/common/locales/es';
registerLocaleData(es);
export function I18nHttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, `assets/tmp/i18n/`, '.json');
}
const I18NSERVICE_MODULES = [
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: I18nHttpLoaderFactory,
      deps: [HttpClient],
    },
  }),
];
// #endregion

// #region global third module
import { BidiModule } from '@angular/cdk/bidi';
const GLOBAL_THIRD_MODULES: Type<any>[] = [BidiModule];
// #endregion

// #region Permissions
import { NgxPermissionsModule } from 'ngx-permissions';
import { JwtModule } from '@auth0/angular-jwt';
// #endregion

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule,
    HttpClientJsonpModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('TOKEN');
        },
      },
    }),
    NgxPermissionsModule.forRoot(),
    ...I18NSERVICE_MODULES,
    ...GLOBAL_THIRD_MODULES,
  ],
  providers: [
    APPINIT_Theme_System,
    APPINIT_Conf_NZ_ZORRO,
    APPINIT_Inf_Divice,
    APPINIT_Interceptor_Token,
    APPINIT_Authorization,
    ...LANG_PROVIDES,
  ],
})
export class GlobalModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: GlobalModule,
    };
  }
}
