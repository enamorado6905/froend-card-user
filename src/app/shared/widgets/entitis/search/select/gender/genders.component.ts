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
  selector: 'app-select-genders',
  template: `
    <nz-select
      nzMode="multiple"
      nzAllowClear
      nzShowSearch
      nzServerSearch
      [nzPlaceHolder]="'validation.idGender.placeholder' | translate"
      [(ngModel)]="genders"
      (nzOnSearch)="getGender($event)"
      (ngModelChange)="sendGender()"
    >
      <ng-container *ngFor="let option of GetGender">
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
export class GendersSelectsComponent implements OnInit, OnDestroy {
  public genders: Array<string> = [];
  public GetGender: any;
  @Output() idGenders = new EventEmitter<string[]>();
  @Input('gender') set Gender(gender: Array<Gender>) {
    if (gender.length === 0) {
      return;
    }
    gender.forEach(async (m) => {
      await this.getGender(m.name);
      this.genders.push(m._id!);
    });
  }
  @Input('reset') set Reset(value: string[]) {
    if (value.length === 0) {
      this.genders = [];
      this.GetGender = undefined;
      return;
    }
  }
  constructor(private genderService: GenderService) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {}
  sendGender(): void {
    if (this.genders.length === 0) {
      return;
    }
    this.idGenders.emit(this.genders);
  }
  async getGender(value: string): Promise<void> {
    if (!value || value === '') {
      return;
    }
    this.GetGender = await this.genderService.SEARCH_NAME_SELECT(value);
  }
}
