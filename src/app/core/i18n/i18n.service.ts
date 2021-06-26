import { Platform } from '@angular/cdk/platform';
//import { HttpClient } from '@angular/common/http';
import ngEn from '@angular/common/locales/en';
import ngEs from '@angular/common/locales/es';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
//import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { enUS as dfEn, es as dfES } from 'date-fns/locale';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import {
  en_US as zorroEnUS,
  es_ES as zorroEnES,
  NzI18nService,
} from 'ng-zorro-antd/i18n';

interface LangData {
  abbr: string;
  text: string;
  code: string;
  ng: NzSafeAny;
  zorro: NzSafeAny;
  date: NzSafeAny;
}

const DEFAULT = 'en-US';
const LANGS: LangData[] = [
  {
    text: 'English',
    code: 'en-US',
    ng: ngEn,
    zorro: zorroEnUS,
    date: dfEn,
    abbr: '🇬🇧',
  },
  {
    text: 'Español',
    code: 'es-ES',
    ng: ngEs,
    zorro: zorroEnES,
    date: dfES,
    abbr: '🇪🇸',
  },
];

@Injectable({ providedIn: 'root' })
export class I18NService {
  public _default = DEFAULT;
  public _LANGS: LangData[] = LANGS;

  constructor(
    private nzI18nService: NzI18nService,
    private translate: TranslateService,
    private platform: Platform
  ) {}
}
