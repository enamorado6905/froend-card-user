import { Component } from '@angular/core';
import { SharedService } from '../../../shared.service';
@Component({
  selector: 'app-tab-sidebar',
  template: ` <div class="trigger-item">
    <i
      nz-icon
      [nzType]="sharedService.isCollapsed_ ? 'fullscreen' : 'fullscreen-exit'"
      (click)="
        sharedService.isCollapsed_ = !sharedService.isCollapsed_;
        sharedService.clickCollapsed()
      "
    ></i>
  </div>`,
})
export class TabSidebarComponent {
  isCollapsed: boolean = false;
  constructor(public sharedService: SharedService) {}
}
