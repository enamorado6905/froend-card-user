import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from 'src/app/core/i18n/i18n.service';
import { NZConfZorroService } from 'src/app/core/ng-zorro/nz-conf-zorro.service';
import { MessageService } from 'src/app/pages/service/configuration/message/message.service';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-nav-language',
  template: `
    <div class="navbar-trigger-item">
      <i
        nz-icon
        nzType="global"
        nzTheme="outline"
        nz-dropdown
        [nzDropdownMenu]="menu"
        [nzPlacement]="position"
        [nzTrigger]="trigger"
        [nzOverlayStyle]="style_dropdown"
      >
      </i>
      <nz-dropdown-menu #menu="nzDropdownMenu">
        <ul nz-menu>
          <li
            nz-menu-item
            *ngFor="let item of i18N._LANGS"
            (click)="selectLanguage(item.code, item.text, item.abbr)"
          >
            {{ item.abbr }} {{ item.text }}
          </li>
        </ul>
      </nz-dropdown-menu>
    </div>
  `,
})
export class NavLanguageComponent implements OnInit {
  public position: NzPlacementType = this.NZConf.positionDropdown_navbar;
  public trigger = this.NZConf.click_hover;
  public style_dropdown = this.NZConf.styleDropdown_navbar;

  constructor(
    private NZConf: NZConfZorroService,
    public i18N: I18NService,
    private translate: TranslateService,
    private message: MessageService
  ) {}

  ngOnInit(): void {}
  selectLanguage(code: string, text: string, icon: string): void {
    if (this.translate.currentLang != code) {
      this.translate.use(code).subscribe(
        () => {
          this.translate
            .get(`language.change-language`, { icon: icon, language: text })
            .subscribe((message: string) => {
              this.message.createMessageSuccess(message);
            });
        },
        () => {
          this.translate
            .get(`language.error-change-language`, {
              icon: icon,
              language: text,
            })
            .subscribe((message: string) => {
              this.message.createMessageError(message);
            });
        }
      );
    } else {
      this.translate
        .get(`language.use-language`, { icon: icon, language: text })
        .subscribe((message: string) => {
          this.message.createMessageInfo(message);
        });
    }
  }
}
