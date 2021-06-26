import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/pages/interfaces/entitis/user.interface';
import { UserCOMService } from 'src/app/pages/service/comunication/user.service';
import { UserService } from 'src/app/pages/service/entitis/user.service';
import { NzImageService } from 'ng-zorro-antd/image';
import { environment } from 'src/environments/environment';
import { NZConfZorroService } from 'src/app/core/ng-zorro/nz-conf-zorro.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-showuser',
  templateUrl: './showuser.component.html',
})
export class ShowuserComponent implements OnInit, OnDestroy {
  public user: User | undefined;
  public loadingDate = false;
  public clientesSubscription: Array<Subscription> = [];
  constructor(
    private userService: UserService,
    public comuUser: UserCOMService,
    private nzImageService: NzImageService,
    public nzZorro: NZConfZorroService
  ) {
    this.clientesSubscription.push(this.comuUser.subcribeLayoutChanges());
  }
  ngOnDestroy(): void {}
  destroy(): void {
    this.comuUser.openOperation = false;
    this.loadingDate = false;
    this.clientesSubscription.forEach((sub: any) => sub.unsubscribe());
    this.comuUser.openListDate();
  }
  ngOnInit(): void {
    this.getDate();
  }
  private getDate(): void {
    this.loadingDate = true;
    if (!this.comuUser.IDManageList) {
      this.destroy();
    } else {
      const subscribe = this.userService
        .GET_ADM(this.comuUser.IDManageList)
        .subscribe(
          (res: User) => {
            this.user = res;
            this.loadingDate = false;
          },
          () => {
            this.destroy();
          }
        );
      this.clientesSubscription.push(subscribe);
    }
  }
  showImg(): void {
    let url = '';
    if (!this.user?.idimgData) {
      url = 'photo/vue.jpg';
    } else {
      url = 'imagen/' + this.user?.idimgData;
    }
    const images = [
      {
        src: environment.CONTACT_URL + url,
        width: '300px',
        height: '300px',
        alt: this.user?.user,
      },
    ];
    this.nzImageService.preview(images, { nzZoom: 1.5, nzRotate: 0 });
  }
}
