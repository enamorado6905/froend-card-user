import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InfoDiviceService {
  Exp_DiviceType: RegExp = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|mobile|CriOS|Windows Phone|Windows/;
  appCodeName: string | undefined | null;
  appVersion: string | undefined | null;
  language: string | undefined | null;
  languages: ReadonlyArray<string> = [];
  platform: string | undefined | null;
  sytem_Operaty: string | undefined | null;
  sytem_type: string | undefined | null;
  sytem_Version: string | undefined | null;
  name_divice: string | undefined | null;
  browset_Type: string | undefined | null;
  browset_Version: string | undefined | null;
  isMovil: boolean | undefined | null;
  divice: string | undefined | null;

  constructor() {}

  public InfoDivice() {
    this.appCodeName = navigator.appCodeName;
    this.appVersion = navigator.appVersion;
    this.language = navigator.language;
    this.languages = navigator.languages;
    this.platform = navigator.platform;
    this.isDivice_Movil();
    this.Browset_Type();
  }
  public isDivice_Movil(): void {
    if (navigator.userAgent.toLowerCase().indexOf('mobile') > -1) {
      this.isMovil = true;
    } else {
      this.isMovil = false;
    }
  }
  public Browset_Type(): void {
    if (navigator.userAgent.toLowerCase().indexOf('safari')) {
      this.browset_Type = 'Safari';
      return;
    } else if (navigator.userAgent.toLowerCase().indexOf('chrome')) {
      this.sytem_Operaty = 'Chrome';
      return;
    } else if (navigator.userAgent.toLowerCase().indexOf('opera')) {
      this.sytem_Operaty = 'Opera';
      return;
    } else if (navigator.userAgent.toLowerCase().indexOf('firefox')) {
      this.sytem_Operaty = 'Firefox';
      return;
    } else if (navigator.userAgent.indexOf('MSIE')) {
      this.sytem_Operaty = 'Internet Explorer';
      return;
    } else {
      return;
    }
  }
}
