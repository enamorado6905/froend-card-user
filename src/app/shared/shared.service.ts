import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'src/app/pages/service/configuration/message/message.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  //Event when open and closet Sidebar
  public isCollapsed_: boolean = false;
  public Event_isCollapsed_Suject = new Subject<boolean>();
  public reciveEvent_Event_isCollapsed_Observable = this.Event_isCollapsed_Suject.asObservable();

  constructor(
    private translate: TranslateService,
    private message: MessageService
  ) {}
  clickCollapsed(): void {
    if (this.isCollapsed_) {
      this.translate
        .get(`notification.tab-sidebar-closed`)
        .subscribe((message: string) => {
          this.message.createMessageInfo(message);
        });
    } else {
      this.translate
        .get(`notification.tab-sidebar-open`)
        .subscribe((message: string) => {
          this.message.createMessageInfo(message);
        });
    }
  }
}
