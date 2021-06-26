import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <nz-pagination
      [nzPageIndex]="1"
      [nzTotal]="total"
      nzShowSizeChanger
      (nzPageIndexChange)="changePageItem($event)"
      (nzPageSizeChange)="sizeItem($event)"
      [nzItemRender]="renderItemTemplate"
      [nzShowTotal]="rangeTemplate"
    ></nz-pagination>
    <ng-template #renderItemTemplate let-type let-page="page">
      <ng-container [ngSwitch]="type">
        <a *ngSwitchCase="'page'">{{ page }}</a>
        <a *ngSwitchCase="'prev'">Previous</a>
        <a *ngSwitchCase="'next'">Next</a>
        <a *ngSwitchCase="'prev_5'"><<</a>
        <a *ngSwitchCase="'next_5'">>></a>
      </ng-container>
    </ng-template>
    <ng-template #rangeTemplate let-range="range" let-total>
      {{ range[0] }}-{{ range[1] }} of {{ total }} items
    </ng-template>
  `,
})
export class PaginationComponent implements OnInit {
  @Input() total = 0;
  @Output() maxItem = new EventEmitter<number>();
  @Output() itemPage = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}
  sizeItem(size: number): void {
    this.maxItem.emit(size);
  }
  changePageItem(item: number): void {
    this.itemPage.emit(item);
  }
}
