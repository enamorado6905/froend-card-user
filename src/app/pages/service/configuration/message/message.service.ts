import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private message: NzMessageService) {}

  createMessageError(message: string): void {
    this.message.create('error', message, {
      nzDuration: 5000,
      nzPauseOnHover: true,
    });
  }
  createMessageSuccess(message: string): void {
    this.message.create('success', message, {
      nzDuration: 5000,
      nzPauseOnHover: true,
    });
  }
  createMessageInfo(message: string): void {
    this.message.create('info', message);
  }
  createMessageWarning(message: string): void {
    this.message.create('info', message, {
      nzDuration: 5000,
      nzPauseOnHover: true,
    });
  }
}
