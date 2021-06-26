import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserCOMService } from 'src/app/pages/service/comunication/user.service';
import { UserService } from 'src/app/pages/service/entitis/user.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deleteuser',
  template: '',
})
export class DeleteuserComponent implements OnInit {
  public loadingDate = false;
  public clientesSubscription: Array<Subscription> = [];
  private ids: Array<string> = [];
  constructor(
    private modal: NzModalService,
    private userService: UserService,
    public comuUser: UserCOMService,
    private translate: TranslateService
  ) {}
  destroy(): void {
    this.clientesSubscription.forEach((m) => m.unsubscribe());
    this.modal.closeAll();
    this.comuUser.openOperation = false;
    this.comuUser.openListDate();
  }
  ngOnInit(): void {
    this.showDeleteConfirm();
    setTimeout(() => this.destroy(), 15000);
  }
  private showDeleteConfirm(): void {
    let title: any, buttonCancel: any, buttonOk: any;
    if (!this.comuUser.IDManageList) {
      return this.destroy();
    }
    this.ids.push(this.comuUser.IDManageList);
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
    const subscribe = this.userService.DELETE_ADM(this.ids).subscribe(
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
