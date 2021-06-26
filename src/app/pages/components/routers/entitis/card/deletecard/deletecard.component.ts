import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { CardCOMService } from 'src/app/pages/service/comunication/card.service';
import { ListEntitisService } from 'src/app/pages/service/configuration/listEntitis/listEntitis.service';
import { CardService } from 'src/app/pages/service/entitis/card.service';

@Component({
  selector: 'app-deletecard',
  template: ``,
})
export class DeletecardComponent implements OnInit {
  public clientesSubscription: Array<Subscription> = [];
  private ids: Array<string> = [];
  constructor(
    private modal: NzModalService,
    private cardService: CardService,
    public comuCard: CardCOMService,
    private translate: TranslateService,
    private listEntitis: ListEntitisService
  ) {}
  ngOnDestroy(): void {}
  destroy(): void {
    this.modal.closeAll();
    this.comuCard.openOperation = false;
    this.clientesSubscription.forEach((m) => m.unsubscribe());
    this.comuCard.openListDate();
  }
  ngOnInit(): void {
    this.showDeleteConfirm();
    setTimeout(() => this.destroy(), 15000);
  }
  private showDeleteConfirm(): void {
    let title: any, buttonCancel: any, buttonOk: any;
    if (!this.comuCard.IDManageList) {
      return this.destroy();
    }
    this.ids.push(this.comuCard.IDManageList);
    const subTitle = this.translate
      .get(`notification.delete-confirm`)
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
      nzContent: ``,
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
    const subscribe = this.cardService
      .DELETE_CARD(this.ids)
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
