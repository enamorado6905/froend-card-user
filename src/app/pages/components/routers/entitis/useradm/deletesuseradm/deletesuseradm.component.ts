import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserADMCOMService } from 'src/app/pages/service/comunication/userADM.service';
import { UserADMService } from 'src/app/pages/service/entitis/userADM.service';
import { ListEntitisService } from 'src/app/pages/service/configuration/listEntitis/listEntitis.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deletesuseradm',
  template: ``,
})
export class DeletesuseradmComponent implements OnInit {
  public clientesSubscription: Array<Subscription> = [];
  constructor(
    private modal: NzModalService,
    private userService: UserADMService,
    public comuADM: UserADMCOMService,
    private translate: TranslateService,
    private listEntitis: ListEntitisService
  ) {}
  destroy(): void {
    this.modal.closeAll();
    this.clientesSubscription.forEach((m) => m.unsubscribe());
    this.comuADM.openOperation = false;
    this.listEntitis.clearSetIdDelete();
    while (this.comuADM.IDSManageList.length >= 1) {
      this.comuADM.IDSManageList.shift();
    }
    this.comuADM.openListDate();
  }
  ngOnInit(): void {
    this.showDeleteConfirm();
    setTimeout(() => this.destroy(), 15000);
  }
  showDeleteConfirm(): void {
    let title = '';
    let buttonCancel = '';
    let buttonOk = '';
    if (this.comuADM.IDSManageList.length <= 1) {
      return this.destroy();
    }
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
    const subscribe = this.userService
      .DELETE_ADM(this.comuADM.IDSManageList)
      .subscribe(
        () => {
          this.comuADM.subjectOperation.next();
          this.destroy();
        },
        () => {
          this.destroy();
        }
      );
    this.clientesSubscription.push(subscribe);
  }
}
