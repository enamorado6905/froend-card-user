import { Component, OnInit } from '@angular/core';
//import { InfoDiviceService } from 'src/app/core/info-divice/info-divice.service';
import { NZConfZorroService } from 'src/app/core/ng-zorro/nz-conf-zorro.service';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-info-user-navbar',
  template: ` <div class="navbar-trigger-item"></div> `,
})
export class InfoUserNavbarComponent implements OnInit {
  public position: NzPlacementType = this.NZConf.positionDropdown_navbar;
  public trigger = this.NZConf.click_hover;
  public style_dropdown = this.NZConf.styleDropdown_navbar;

  constructor(private NZConf: NZConfZorroService) {}

  ngOnInit(): void {}

  s() {
    console.log('dsssss');
  }
}
