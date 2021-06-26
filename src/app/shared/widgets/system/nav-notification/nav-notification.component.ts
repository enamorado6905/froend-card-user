import { Component, OnInit } from '@angular/core';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-nav-notification',
  template: `
    <div class="navbar-trigger-item">
      <i
        nz-icon
        nzType="bell"
        nzTheme="outline"
        nz-dropdown
        [nzDropdownMenu]="menu"
        [nzPlacement]="position"
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
export class NavNotificationComponent implements OnInit {
  public position: NzPlacementType = 'bottomRight';
  constructor() {}

  ngOnInit(): void {}
}
