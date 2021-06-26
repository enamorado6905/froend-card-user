import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-operation',
  template: `
    <div *ngIf="size === 1 || size === 0; else allDelete">
      <a
        [nzTooltipTitle]="'app-content.label.show-date' | translate"
        nzTooltipPlacement="top"
        nz-tooltip
        (click)="emitShow()"
        ><i nz-icon nzType="eye" nzTheme="outline"></i
      ></a>
      <nz-divider nzType="vertical"></nz-divider>
      <a
        [nzTooltipTitle]="'app-content.label.edit-date' | translate"
        nzTooltipPlacement="top"
        nz-tooltip
        (click)="emitEdit()"
        ><i nz-icon nzType="edit" nzTheme="outline"></i
      ></a>
      <nz-divider nzType="vertical"></nz-divider>
      <a
        [nzTooltipTitle]="'app-content.label.delete-date' | translate"
        nzTooltipPlacement="top"
        nz-tooltip
        (click)="emitDelete()"
        ><i nz-icon nzType="delete" nzTheme="outline"></i
      ></a>
    </div>
    <ng-template #allDelete>
      <div>
        <a
          [nzTooltipTitle]="'app-content.label.deletes-date' | translate"
          nzTooltipPlacement="top"
          nz-tooltip
          (click)="emitDeletes()"
          (click)="emitDeletes()"
          ><i nz-icon nzType="delete" nzTheme="outline"></i
        ></a>
      </div>
    </ng-template>
  `,
})
export class OperationComponent implements OnInit {
  size = 0;
  @Input('size') set changesize(size: number) {
    if (size) {
      this.size = size;
    } else {
      this.size = 0;
    }
  }
  isOpenShow = false;
  isOpenEdit = false;
  isOpenDelete = false;
  isOpenDeletes = false;
  @Output() emitOpenShow = new EventEmitter<boolean>();
  @Output() emitOpenEdit = new EventEmitter<boolean>();
  @Output() emitOpenDelete = new EventEmitter<boolean>();
  @Output() emitOpenDeletes = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  emitShow(): void {
    this.emitOpenShow.emit(true);
  }
  emitEdit(): void {
    this.emitOpenEdit.emit(true);
  }
  emitDelete(): void {
    this.emitOpenDelete.emit(true);
  }
  emitDeletes(): void {
    this.emitOpenDeletes.emit(true);
  }
}
