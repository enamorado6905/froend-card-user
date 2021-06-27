import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardCOMService } from 'src/app/pages/service/comunication/card.service';
import { ListEntitisService } from 'src/app/pages/service/configuration/listEntitis/listEntitis.service';
import { CardService } from 'src/app/pages/service/entitis/card.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-listcard',
  templateUrl: './listcard.component.html',
})
export class ListcardComponent implements OnInit, OnDestroy {
  public initLoading = true;
  public clientesSubscription: Array<Subscription> = [];
  public allUser = 0;
  public maxUser = 10;
  public minUser = 0;
  public searchValue = '';
  public issearchValue = false;
  public visible = false;

  hGutter = 16;
  vGutter = 16;
  count = 10;
  array = new Array(this.count);

  constructor(
    public comuCard: CardCOMService,
    public listEntitis: ListEntitisService,
    private cardService: CardService
  ) {
    this.clientesSubscription.push(
      this.comuCard.subjectOperation.subscribe({
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
    const subscribe = this.cardService
      .GET_CARDS(this.minUser, this.maxUser)
      .subscribe(
        (res: any) => {
          this.listEntitis.list = res.card;
          this.allUser = res.allCard;
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
    const subscribe = this.cardService
      .SEARCH(this.searchValue, this.minUser, this.maxUser)
      .subscribe(
        (res: any) => {
          this.listEntitis.list = res.card;
          this.allUser = res.allCard;
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
