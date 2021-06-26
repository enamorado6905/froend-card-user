import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { CardCOMService } from 'src/app/pages/service/comunication/card.service';
import { ListEntitisService } from 'src/app/pages/service/configuration/listEntitis/listEntitis.service';
import { CardService } from 'src/app/pages/service/entitis/card.service';

@Component({
  selector: 'app-deletescard',
  template: ``,
})
export class DeletescardComponent implements OnInit {
  public clientesSubscription: Array<Subscription> = [];
  constructor(
    private modal: NzModalService,
    private cardService: CardService,
    public comuCard: CardCOMService,
    private translate: TranslateService,
    private listEntitis: ListEntitisService
  ) {}
  destroy(): void {
    this.modal.closeAll();
    this.clientesSubscription.forEach((m) => m.unsubscribe());
    this.comuCard.openOperation = false;
    this.listEntitis.clearSetIdDelete();
    while (this.comuCard.IDSManageList.length >= 1) {
      this.comuCard.IDSManageList.shift();
    }
    this.comuCard.openListDate();
  }
  ngOnInit(): void {
    this.showDeleteConfirm();
    setTimeout(() => this.destroy(), 15000);
  }
  showDeleteConfirm(): void {
    let title = '';
    let buttonCancel = '';
    let buttonOk = '';
    const subTitle = this.translate
      .get(`notification.deletes-confirm`)
      .subscribe((message: string) => {
        title = message;
      });
    const subBuOK = this.translate
      .get(`button.ok`)
      .subscribe((message: string) => {
        buttonOk = message;
      });
    const subBuCa = this.translate
      .get(`button.cancel`)
      .subscribe((message: string) => {
        buttonCancel = message;
      });
    this.modal.confirm({
      nzTitle: title,
      nzOkText: buttonOk,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.delete();
      },
      nzCancelText: buttonCancel,
      nzOnCancel: () => {
        this.destroy();
      },
    });
    this.clientesSubscription.push(subTitle, subBuOK, subBuCa);
  }
  private delete(): void {
    if (this.comuCard.IDSManageList.length <= 1) {
      return this.destroy();
    }
    const subscribe = this.cardService
      .DELETE_CARD(this.comuCard.IDSManageList)
      .subscribe(
        () => {
          this.comuCard.subjectOperation.next();
          this.destroy();
        },
        () => {
          this.destroy();
        }
      );
    this.clientesSubscription.push(subscribe);
  }
}
