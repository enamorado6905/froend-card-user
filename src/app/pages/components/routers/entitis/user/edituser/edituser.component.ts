import { Component, OnInit, OnDestroy } from '@angular/core';
import { NZConfZorroService } from 'src/app/core/ng-zorro/nz-conf-zorro.service';
import { UserService } from 'src/app/pages/service/entitis/user.service';
import { UserCOMService } from 'src/app/pages/service/comunication/user.service';
import { Subscription } from 'rxjs';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/pages/interfaces/entitis/user.interface';
import * as valid from 'src/app/pages/store/validators.const';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
})
export class EdituserComponent implements OnInit, OnDestroy {
  public clientesSubscription: Array<Subscription> = [];
  public user: User | undefined;
  public initloading = false;
  public loadingDate = false;
  public date!: FormGroup;
  get userName(): AbstractControl | null {
    return this.date.get('userName');
  }
  get email(): AbstractControl | null {
    return this.date.get('email');
  }
  get name(): AbstractControl | null {
    return this.date.get('name');
  }

  constructor(
    private userService: UserService,
    public comuUser: UserCOMService,
    public nzZorro: NZConfZorroService
  ) {
    this.date = this.validatorsDate();
    this.clientesSubscription.push(this.comuUser.subcribeLayoutChanges());
  }
  ngOnDestroy(): void {}
  destroy(): void {
    this.comuUser.openOperation = false;
    this.comuUser.openListDate();
  }
  ngOnInit(): void {
    this.getDate();
  }
  private getDate(): void {
    this.initloading = true;
    if (!this.comuUser.IDManageList) {
      return this.destroy();
    }
    const subscribe = this.userService
      .GET_ADM(this.comuUser.IDManageList!)
      .subscribe(
        (res: User) => {
          this.user = res;
          this.name?.setValue(res.name);
          this.userName?.setValue(res.user);
          this.initloading = false;
        },
        () => {
          this.destroy();
        }
      );
    this.clientesSubscription.push(subscribe);
  }
  sendDate(): void {
    this.loadingDate = true;
    const subscribe = this.userService
      .EDIT_ADM(
        this.comuUser.IDManageList!,
        this.name?.value,
        this.userName?.value
      )
      .subscribe(
        () => {
          this.date.reset();
          this.loadingDate = false;
          this.getDate();
          this.comuUser.subjectOperation.next();
        },
        () => {
          this.destroy();
        }
      );
    this.clientesSubscription.push(subscribe);
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
          valid.ValidatorsUser.asyncuser_EditValidator(
            this.comuUser.IDManageList!,
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
    });
  }
}
