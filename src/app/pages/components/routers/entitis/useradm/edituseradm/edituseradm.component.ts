import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NZConfZorroService } from 'src/app/core/ng-zorro/nz-conf-zorro.service';
import { UserADMCOMService } from 'src/app/pages/service/comunication/userADM.service';
import { UserADMService } from 'src/app/pages/service/entitis/userADM.service';
import { RolADMService } from 'src/app/pages/service/entitis/rolADM.service';
import { UserADM } from 'src/app/pages/interfaces/entitis/userADM.interface';
import { RolADM } from 'src/app/pages/interfaces/entitis/rol.interface';
import { Subscription } from 'rxjs';
import * as valid from 'src/app/pages/store/validators.const';

@Component({
  selector: 'app-edituseradm',
  templateUrl: './edituseradm.component.html',
})
export class EdituseradmComponent implements OnInit, OnDestroy {
  public clientesSubscription: Array<Subscription> = [];
  public userAdm: UserADM | undefined;
  public initloading = false;
  public loadingDateRol = false;
  public loadingDatePermissions = false;
  public loadingDate = false;
  public dateRolPermissons!: FormGroup;
  public date!: FormGroup;
  public rolUserADM: RolADM | undefined;
  public listofRol: any;
  public listofPermissions: any;

  get userName(): AbstractControl | null {
    return this.date.get('userName');
  }
  get email(): AbstractControl | null {
    return this.date.get('email');
  }
  get name(): AbstractControl | null {
    return this.date.get('name');
  }
  get nametwo(): AbstractControl | null {
    return this.date.get('nametwo');
  }
  get lastnameone(): AbstractControl | null {
    return this.date.get('lastnameone');
  }
  get lastnametwo(): AbstractControl | null {
    return this.date.get('lastnametwo');
  }
  get rol(): AbstractControl | null {
    return this.dateRolPermissons.get('rol');
  }
  get permissions(): AbstractControl | null {
    return this.dateRolPermissons.get('permissions');
  }
  constructor(
    private userService: UserADMService,
    public comuADM: UserADMCOMService,
    public rolAdmService: RolADMService,
    public nzZorro: NZConfZorroService
  ) {
    this.dateRolPermissons = this.validatorsDateRolPerm();
    this.date = this.validatorsDate();
    this.clientesSubscription.push(this.comuADM.subcribeLayoutChanges());
  }
  ngOnDestroy(): void {}
  destroy(): void {
    this.clientesSubscription.forEach((sub: any) => sub.unsubscribe());
    this.comuADM.openOperation = false;
    this.comuADM.openListDate();
  }
  ngOnInit(): void {
    this.getDate();
    this.listofRol = this.rolAdmService.GET_ROLS_ADDUSER();
  }
  private getDate(): void {
    this.initloading = true;
    if (!this.comuADM.IDManageList) {
      return this.destroy();
    }
    const subscribe = this.userService
      .GET_ADM(this.comuADM.IDManageList)
      .subscribe(
        (res: UserADM) => {
          this.userAdm = res;
          this.rol?.setValue(res.rol._id);
          this.name?.setValue(res.name);
          this.nametwo?.setValue(res.nametwo);
          this.lastnameone?.setValue(res.lastnameone);
          this.lastnametwo?.setValue(res.lastnametwo);
          this.userName?.setValue(res.user);
          this.email?.setValue(res.email);
          this.initloading = false;
        },
        () => {
          this.destroy();
        }
      );
    this.clientesSubscription.push(subscribe);
  }
  sendRol(): void {
    this.loadingDateRol = true;
    if (!this.comuADM.IDManageList) {
      this.destroy();
    } else {
      const subscribe = this.userService
        .EDIT_ROL_ADM(this.comuADM.IDManageList, this.rol?.value)
        .subscribe(
          () => {
            this.getDate();
            this.loadingDateRol = false;
            this.comuADM.subjectOperation.next();
          },
          () => {
            this.destroy();
          }
        );
      this.clientesSubscription.push(subscribe);
    }
  }
  sendDate(): void {
    this.loadingDate = true;
    const subscribe = this.userService
      .EDIT_ADM(
        this.comuADM.IDManageList!,
        this.name?.value,
        this.nametwo?.value,
        this.lastnameone?.value,
        this.lastnametwo?.value,
        this.email?.value,
        this.userName?.value
      )
      .subscribe(
        () => {
          this.getDate();
          this.loadingDate = false;
          this.comuADM.subjectOperation.next();
        },
        () => {
          this.destroy();
        }
      );
    this.clientesSubscription.push(subscribe);
  }
  private validatorsDateRolPerm(): FormGroup {
    return new FormGroup({
      permissions: new FormControl(null, []),
      rol: new FormControl(null, [Validators.required]),
    });
  }
  private validatorsDate(): FormGroup {
    return new FormGroup({
      userName: new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern(valid.UserName_Pattern),
          Validators.minLength(3),
          Validators.maxLength(70),
        ],
        [
          valid.ValidatorsUser.asyncUser_EditValidator(
            this.comuADM.IDManageList!,
            this.userService
          ),
        ]
      ),
      email: new FormControl(
        null,
        [Validators.required, Validators.pattern(valid.email_Pattern)],
        [
          valid.ValidatorsUser.asyncEmail_EditValidator(
            this.comuADM.IDManageList!,
            this.userService
          ),
        ]
      ),
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(valid.Names_Pattern),
        Validators.minLength(3),
        Validators.maxLength(70),
      ]),
      nametwo: new FormControl(null, [
        Validators.pattern(valid.Names_Pattern),
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      lastnameone: new FormControl(null, [
        Validators.required,
        Validators.pattern(valid.Names_Pattern),
        Validators.minLength(3),
        Validators.maxLength(70),
      ]),
      lastnametwo: new FormControl(null, [
        Validators.required,
        Validators.pattern(valid.Names_Pattern),
        Validators.minLength(3),
        Validators.maxLength(70),
      ]),
    });
  }
}
