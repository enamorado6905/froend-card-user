import { Injectable } from '@angular/core';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class NZConfZorroService {
  public click_hover: 'click' | 'hover' = 'hover';
  public positionDropdown_navbar: NzPlacementType = 'bottomRight';
  public styleDropdown_navbar: object = {
    'margin-top': '25px',
  };
  public maskClosableDrawer = true;
  public nzColumn = { xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 };
  public nzWidthDrawer = 230;
  public isSmallScreen = this.breakObsrv.isMatched('(max-width: 599px)');
  public layoutChanges = this.breakObsrv.observe([
    '(orientation: portrait)',
    '(orientation: landscape)',
  ]);
  constructor(private breakObsrv: BreakpointObserver) {}
  public NZconf(): void {
    if (navigator.userAgent.toLowerCase().indexOf('mobile') > -1) {
      this.click_hover = 'click';
      this.maskClosableDrawer = false;
    } else {
      this.click_hover = 'hover';
    }
  }
  updateMyLayoutForOrientationChange(): void {
    if (this.isSmallScreen) {
      this.nzWidthDrawer = window.innerWidth;
    } else {
      this.nzWidthDrawer = 600;
    }
  }
}
