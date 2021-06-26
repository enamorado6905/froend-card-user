import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from './core/i18n/i18n.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'FEnd-Car-User';
  constructor(private translate: TranslateService, private i18n: I18NService) {
    this.translate.setDefaultLang(this.i18n._default);
    this.translate.use(this.i18n._default);
  }
}
