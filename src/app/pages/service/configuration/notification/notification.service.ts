import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private notification: NzNotificationService,
    private translate: TranslateService
  ) {}
  createNotificationSuccess(message: string): void {
    this.translate.get(`notification.success`).subscribe((title: string) => {
      this.notification.create('success', title, message);
    });
  }
  createNotificationError(message: string): void {
    this.translate.get(`notification.error`).subscribe((title: string) => {
      this.notification.create('error', title, message);
    });
  }
  createNotificationWarning(message: string): void {
    this.translate.get(`notification.warning`).subscribe((title: string) => {
      this.notification.create('warning', title, message);
    });
  }
  createNotificationInfo(message: string): void {
    this.translate.get(`notification.info`).subscribe((title: string) => {
      this.notification.create('info', title, message);
    });
  }
}
