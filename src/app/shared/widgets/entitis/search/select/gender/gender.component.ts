import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { Gender } from 'app/user/interfaces/entitis/gender.interface';
import { GenderService } from 'app/user/service/entitis/gender.service';

@Component({
  selector: 'app-select-gender',
  template: `
    <nz-select
      nzAllowClear
      nzShowSearch
      nzServerSearch
      [nzPlaceHolder]="'validation.idGender.placeholder' | translate"
      [(ngModel)]="gender"
      (nzOnSearch)="getGender($event)"
      (ngModelChange)="sendGender()"
    >
      <ng-container *ngFor="let option of GetGender | async">
        <nz-option
          *ngIf="GetGender"
          [nzValue]="option._id"
          [nzLabel]="option.name"
        ></nz-option>
      </ng-container>
      <nz-option *ngIf="!GetGender" nzDisabled nzCustomContent>
        <i nz-icon nzType="loading" class="loading-icon"></i> Loading Data...
      </nz-option>
    </nz-select>
  `,
})
export class GenderSelectComponent implements OnInit, OnDestroy {
  public gender: string | undefined;
  public GetGender: any;
  @Output() idGender = new EventEmitter<string>();
  @Input('gender') set Gender(gender: Gender) {
    if (!gender) {
      return;
    }
    this.getGender(gender.name);
    this.gender = gender._id!;
  }
  @Input('reset') set Reset(value: any) {
    if (!value) {
      this.gender = undefined;
      this.GetGender = undefined;
      return;
    }
  }
  constructor(private genderService: GenderService) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {}
  sendGender(): void {
    if (!this.gender) {
      return;
    }
    this.idGender.emit(this.gender);
  }
  async getGender(value: string): Promise<void> {
    if (!value || value === '') {
      return;
    }
    this.GetGender = await this.genderService.SEARCH_NAME_SELECT(value);
  }
}
