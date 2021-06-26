import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserCOMService } from 'src/app/pages/service/comunication/user.service';
import { UserService } from 'src/app/pages/service/entitis/user.service';
import { TranslateService } from '@ngx-translate/core';
import { ListEntitisService } from 'src/app/pages/service/configuration/listEntitis/listEntitis.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deletesuser',
  template: '',
})
export class DeletesuserComponent implements OnInit {
  public clientesSubscription: Array<Subscription> = [];

  constructor(
    private modal: NzModalService,
    private userService: UserService,
    public comuUser: UserCOMService,
    private translate: TranslateService,
    private listEntitis: ListEntitisService
  ) {}
  destroy(): void {
    this.clientesSubscription.forEach((m) => m.unsubscribe());
    this.comuUser.openOperation = false;
    this.modal.closeAll();
    while (this.comuUser.IDSManageList.length >= 1) {
      this.comuUser.IDSManageList.shift();
    }
    this.listEntitis.clearSetIdDelete();
    this.comuUser.openListDate();
  }
  ngOnInit(): void {
    this.showDeleteConfirm();
    setTimeout(() => this.destroy(), 15000);
  }
  private showDeleteConfirm(): void {
    let title: any, buttonCancel: any, buttonOk: any;
    if (this.comuUser.IDSManageList.length <= 1) {
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
      .DELETE_ADM(this.comuUser.IDSManageList)
      .subscribe(
        () => {
          this.comuUser.subjectOperation.next();
          this.destroy();
        },
        () => {
          this.destroy();
        }
      );
    this.clientesSubscription.push(subscribe);
  }
}
