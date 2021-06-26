import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  template: `
    <div class="input-search">
      <nz-input-group [nzSuffix]="prefixIconSearch">
        <input type="text" nz-input placeholder="input search text" />
      </nz-input-group>
      <ng-template #prefixIconSearch>
        <i nz-icon nzType="search"></i>
      </ng-template>
    </div>
    <div class="trigger-item" (click)="open()">
      <i nz-icon nzType="search" nzTheme="outline"></i>
    </div>
    <nz-drawer
      [nzClosable]="true"
      [nzVisible]="visible"
      nzPlacement="top"
      [nzTitle]="TitleTpl"
      (nzOnClose)="close()"
    >
      <ng-template #TitleTpl>
        <div class="drawer-search-movil input-search">
          <nz-input-group [nzSuffix]="prefixIconSearch">
            <input type="text" nz-input placeholder="input search text" />
          </nz-input-group>
          <ng-template #prefixIconSearch>
            <i nz-icon nzType="search"></i>
          </ng-template>
        </div>
      </ng-template>
      <ng-container *nzDrawerContent></ng-container>
    </nz-drawer>
  `,
})
export class AppSearchComponent implements OnInit {
  public visible: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.change();
  }
  change(): void {
    this.layout();
    window.addEventListener('resize', this.layout);
  }
  layout(): void {
    let inputShearch = document.getElementsByClassName('input-search')[0]!;
    let triggerShearch = document.getElementsByClassName('trigger-item')[0]!;
    if (window.innerWidth >= 768) {
      inputShearch?.classList.remove!('none');
      triggerShearch?.classList.add('none');
    } else if (window.innerWidth < 768) {
      triggerShearch?.classList.remove!('none');
      inputShearch?.classList.add('none');
    }
  }
  open(): void {
    this.visible = true;
  }
  close(): void {
    this.visible = false;
  }
}
