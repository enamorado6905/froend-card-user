import { APP_INITIALIZER } from '@angular/core';
import { ThemeService } from './theme/theme.service';
import { ApiPrefixInterceptor } from './http/api-prefix.interceptor';
import { InfoDiviceService } from './info-divice/info-divice.service';
import { NZConfZorroService } from './ng-zorro/nz-conf-zorro.service';
import { AuthorizationService } from './authorization/rol.authorization';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const APPINIT_Interceptor_Token = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiPrefixInterceptor,
  multi: true,
};
export const APPINIT_Theme_System = {
  provide: APP_INITIALIZER,
  useFactory: (themeService: ThemeService) => (): Promise<Event> => {
    return themeService.loadTheme();
  },
  deps: [ThemeService],
  multi: true,
};
export const APPINIT_Inf_Divice = {
  provide: APP_INITIALIZER,
  useFactory: (infoDiviceService: InfoDiviceService) => (): void => {
    return infoDiviceService.InfoDivice();
  },
  deps: [InfoDiviceService],
  multi: true,
};
export const APPINIT_Conf_NZ_ZORRO = {
  provide: APP_INITIALIZER,
  useFactory: (NZ: NZConfZorroService) => (): void => {
    return NZ.NZconf();
  },
  deps: [NZConfZorroService],
  multi: true,
};
export const APPINIT_Authorization = {
  provide: APP_INITIALIZER,
  useFactory: (auth: AuthorizationService) => (): void => {
    return auth.GET_ROL_PERMISSIONS();
  },
  deps: [AuthorizationService],
  multi: true,
};
