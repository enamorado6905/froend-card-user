import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserADM } from 'src/app/pages/interfaces/entitis/userADM.interface';
import { UserADMCOMService } from 'src/app/pages/service/comunication/userADM.service';
import { UserADMService } from 'src/app/pages/service/entitis/userADM.service';
import { NzImageService } from 'ng-zorro-antd/image';
import { environment } from 'src/environments/environment';
import { NZConfZorroService } from 'src/app/core/ng-zorro/nz-conf-zorro.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-showuseradm',
  templateUrl: './showuseradm.component.html',
})
export class ShowuseradmComponent implements OnInit, OnDestroy {
  public clientesSubscription: Array<Subscription> = [];
  public userAdm: UserADM | undefined;
  public loadingDate = false;
  constructor(
    private userService: UserADMService,
    public comuADM: UserADMCOMService,
    private nzImageService: NzImageService,
    public nzZorro: NZConfZorroService
  ) {
    this.clientesSubscription.push(this.comuADM.subcribeLayoutChanges());
  }
  ngOnDestroy(): void {}
  destroy(): void {
    this.comuADM.openOperation = false;
    this.clientesSubscription.forEach((sub: any) => sub.unsubscribe());
    this.comuADM.openListDate();
  }
  ngOnInit(): void {
    this.getDate();
  }
  getDate(): void {
    this.loadingDate = true;
    if (!this.comuADM.IDManageList) {
      this.ngOnDestroy();
    } else {
      const subscribe = this.userService
        .GET_ADM(this.comuADM.IDManageList)
        .subscribe(
          (res: UserADM) => {
            this.userAdm = res;
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
    if (!this.userAdm?.idimgData) {
      url = 'photo/vue.jpg';
    } else {
      url = 'imagen/' + this.userAdm?.idimgData;
    }
    const images = [
      {
        src: environment.CONTACT_URL + url,
        width: '300px',
        height: '300px',
        alt: this.userAdm?.user,
      },
    ];
    this.nzImageService.preview(images, { nzZoom: 1.5, nzRotate: 0 });
  }
}
