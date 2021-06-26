import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserADM } from 'src/app/pages/interfaces/entitis/userADM.interface';
import { UserADMCOMService } from 'src/app/pages/service/comunication/userADM.service';
import { ListEntitisService } from 'src/app/pages/service/configuration/listEntitis/listEntitis.service';
import { UserADMService } from 'src/app/pages/service/entitis/userADM.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listuseradm',
  templateUrl: './listuseradm.component.html',
})
export class ListuseradmComponent implements OnInit, OnDestroy {
  public initLoading = true;
  public clientesSubscription: Array<Subscription> = [];
  public allUser = 0;
  public maxUser = 10;
  public minUser = 0;
  public searchValue = '';
  public issearchValue = false;
  public visible = false;

  constructor(
    public comuADM: UserADMCOMService,
    public listEntitis: ListEntitisService,
    private userADM: UserADMService
  ) {
    this.clientesSubscription.push(
      this.comuADM.subjectOperation.subscribe({
        next: () => this.listUser(),
      })
    );
  }
  ngOnDestroy(): void {
    this.clientesSubscription.forEach((sub: any) => sub.unsubscribe());
    this.listEntitis.clearSetIdDelete();
  }
  ngOnInit(): void {
    this.listUser();
  }
  listUser(): void {
    this.initLoading = true;
    const subscribe = this.userADM
      .GET_ADMS(this.minUser, this.maxUser)
      .subscribe(
        (res: any) => {
          this.listEntitis.list = res.user;
          this.allUser = res.allUser;
          this.initLoading = false;
        },
        () => {
          this.listEntitis.list = [];
          this.allUser = 0;
          this.initLoading = false;
        }
      );
    this.clientesSubscription.push(subscribe);
  }
  listSearchForNames(): void {
    this.initLoading = true;
    const subscribe = this.userADM
      .SEARCH(this.searchValue, this.minUser, this.maxUser)
      .subscribe(
        (res: any) => {
          this.listEntitis.list = res.user;
          console.log(res.user)
          this.allUser = res.allUser;
          this.initLoading = false;
        },
        () => {
          this.listEntitis.list = [];
          this.allUser = 0;
          this.initLoading = false;
        }
      );
    this.clientesSubscription.push(subscribe);
  }
  changeSizeItemPagination(value: number): void {
    this.maxUser = value;
    this.listUser();
  }
  changeItemPagination(value: number): void {
    this.minUser = value - 1;
    this.listUser();
  }
  reset(): void {
    this.searchValue = '';
    this.listUser();
  }
  search(): void {
    this.visible = false;
    if (this.searchValue !== '') {
      this.listSearchForNames();
    }
  }
  changeValueSearchName(value: any): void {
    this.searchValue = value.target.value;
    this.issearchValue = true;
    if (this.searchValue === '') {
      this.reset();
      this.issearchValue = false;
    }
  }
}
