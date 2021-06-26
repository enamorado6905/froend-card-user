import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserADMCOMService } from 'src/app/pages/service/comunication/userADM.service';
import { VerifyTokenService } from 'src/app/pages/service/configuration/auth/verify_token.service';
import { NZConfZorroService } from 'src/app/core/ng-zorro/nz-conf-zorro.service';
import { UserService } from 'src/app/pages/service/entitis/user.service';
import { User } from 'src/app/pages/interfaces/entitis/user.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info-user',
  template: `
    <div class="info-user" target="_blank">
      <nz-skeleton
        [nzLoading]="loadingInfo"
        [nzAvatar]="true"
        [nzActive]="true"
        [nzParagraph]="{ rows: 1 }"
      >
        <app-avatar [url]="user?.idimgData!"></app-avatar>
        <div
          class="text-info-user"
          id="dropdown-info-user"
          nz-dropdown
          [nzDropdownMenu]="menu"
          [nzPlacement]="'bottomRight'"
          [nzTrigger]="NZConf.click_hover"
        >
          {{ user?.name }}
          {{ user?.lastnameone }}
          <i nz-icon nzType="down"></i>
        </div>
        <nz-dropdown-menu #menu="nzDropdownMenu">
          <ul nz-menu wnzSelectable>
            <li nz-menu-item>
              <a [routerLink]="['informacion/usuario']">
                {{ 'app-sidebar.label.info-user' | translate }}
              </a>
            </li>
            <li nz-menu-item nzDanger (click)="verifyToken.logoutToken()">
              {{ 'app-sidebar.label.closed-session' | translate }}
            </li>
          </ul>
        </nz-dropdown-menu>
      </nz-skeleton>
    </div>
  `,
})
export class InfoUserComponent implements OnInit, OnDestroy {
  public clientesSubscription: Array<Subscription> = [];
  public loadingInfo = true;
  public user: User | undefined;
  constructor(
    public NZConf: NZConfZorroService,
    public verifyToken: VerifyTokenService,
    public userADMCOM: UserADMCOMService,
    private userService: UserService
  ) {}
  ngOnDestroy(): void {
    this.clientesSubscription.forEach((m) => m.unsubscribe());
  }
  ngOnInit(): void {
    this.infoUser();
  }
  infoUser(): void {
    const ID = localStorage.getItem('ID');
    if (ID) {
      const subscribe = this.userService.GET_USER(ID).subscribe(
        (res: User) => {
          this.user = res;
          this.loadingInfo = false;
        },
        (ERROR: any) => {
          console.log(ERROR);
        }
      );
      this.clientesSubscription.push(subscribe);
    }
  }
}
