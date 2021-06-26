import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared.service';

@Component({
  selector: 'app-drawer-sidebar',
  template: `
    <div class="trigger-item">
      <i
        nz-icon
        [nzType]="visible ? 'menu-unfold' : 'menu-fold'"
        (click)="open()"
      ></i>
    </div>
    <nz-drawer
      [nzBodyStyle]="contentStyle"
      [nzClosable]="false"
      [nzVisible]="visible"
      nzPlacement="right"
      [nzTitle]="TitleTpl"
      (nzOnClose)="close()"
    >
      <ng-template #TitleTpl>
        <div class="drawer-sidebar-movil">
          <app-info-user></app-info-user>
        </div>
      </ng-template>
      <ng-container *nzDrawerContent>
        <app-list-sidebar></app-list-sidebar>
      </ng-container>
    </nz-drawer>
  `,
})
export class DrawerSidebarComponent implements OnInit {
  constructor(private sharedService: SharedService) {}
  public contentStyle: object = {
    padding: 0,
  };
  public visible: boolean = false;

  ngOnInit(): void {}
  open(): void {
    this.visible = true;
    this.sharedService.isCollapsed_ = false; // menu open
  }
  close(): void {
    this.visible = false;
  }
}
