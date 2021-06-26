import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserADMCOMService } from 'src/app/pages/service/comunication/userADM.service';
import { UserADMService } from 'src/app/pages/service/entitis/userADM.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deleteuseradm',
  template: ``,
})
export class DeleteuseradmComponent implements OnInit, OnDestroy {
  public clientesSubscription: Array<Subscription> = [];
  private ids: Array<string> = [];
  constructor(
    private modal: NzModalService,
    private userService: UserADMService,
    public comuADM: UserADMCOMService,
    private translate: TranslateService
  ) {}
  ngOnDestroy(): void {}
  destroy(): void {
    this.modal.closeAll();
    this.comuADM.openOperation = false;
    this.clientesSubscription.forEach((m) => m.unsubscribe());
    this.comuADM.openListDate();
  }
  ngOnInit(): void {
    this.showDeleteConfirm();
    setTimeout(() => this.destroy(), 15000);
  }
  private showDeleteConfirm(): void {
    let title = '';
    let buttonCancel = '';
    let buttonOk = '';
    if (!this.comuADM.IDManageList) {
      return this.destroy();
    }
    this.ids.push(this.comuADM.IDManageList);
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
