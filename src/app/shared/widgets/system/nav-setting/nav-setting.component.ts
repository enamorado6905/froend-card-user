import { Component, OnInit } from '@angular/core';
import { NZConfZorroService } from 'src/app/core/ng-zorro/nz-conf-zorro.service';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-nav-setting',
  template: `
    <div class="navbar-trigger-item">
      <i
        nz-icon
        nzType="setting"
        nzTheme="outline"
        nz-dropdown
        [nzDropdownMenu]="menu"
        [nzPlacement]="position"
        [nzTrigger]="trigger"
      >
      </i>
      <nz-dropdown-menu #menu="nzDropdownMenu">
        <ul nz-menu>
          <li nz-menu-item>1st menu item length</li>
          <li nz-menu-item>2nd menu item length</li>
          <li nz-menu-item>3rd menu item length</li>
        </ul>
      </nz-dropdown-menu>
    </div>
  `,
})
export class NavSettingComponent implements OnInit {
  public position: NzPlacementType = 'bottomRight';
  public trigger = this.NZConf.click_hover;

  constructor(private NZConf: NZConfZorroService) {}

  ngOnInit(): void {
    console.log(this.NZConf.click_hover);
  }
}
