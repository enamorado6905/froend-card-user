import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserCOMService } from 'src/app/pages/service/comunication/user.service';
import { ListEntitisService } from 'src/app/pages/service/configuration/listEntitis/listEntitis.service';
import { UserService } from 'src/app/pages/service/entitis/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
})
export class ListuserComponent implements OnInit, OnDestroy {
  public initLoading = true;
  public clientesSubscription: Array<Subscription> = [];
  public allUser = 0;
  public maxUser = 10;
  public minUser = 0;
  public searchValue = '';
  public visible = false;
  public issearchValue = false;

  constructor(
    private userService: UserService,
    public comuUser: UserCOMService,
    public listEntitis: ListEntitisService
  ) {
    const subscribe = this.comuUser.subjectOperation.subscribe({
      next: () => this.listUser(),
    });
    this.clientesSubscription.push(subscribe);
  }
  ngOnDestroy(): void {
    this.clientesSubscription.forEach((m) => m.unsubscribe());
    this.listEntitis.clearSetIdDelete();
  }
  ngOnInit(): void {
    this.listUser();
  }
  listUser(): void {
    this.initLoading = true;
    const subscribe = this.userService
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
    const subscribe = this.userService
      .SEARCH_NAME(this.searchValue, this.minUser, this.maxUser)
      .subscribe(
        (res: any) => {
          this.listEntitis.list = res.user;
          this.allUser = res.allUser;
          this.initLoading = false;
        },
        () => {
          this.initLoading = false;
          this.reset();
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
