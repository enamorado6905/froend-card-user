import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserCOMService } from 'src/app/pages/service/comunication/user.service';
import { UserService } from 'src/app/pages/service/entitis/user.service';
import {
  ValidatorsUser,
  UserName_Pattern,
  Names_Pattern,
  email_Pattern,
} from 'src/app/pages/store/validators.const';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
})
export class AdduserComponent implements OnInit, OnDestroy {
  //#region Form controls
  public date: FormGroup;
  public clientesSubscription: Array<Subscription> = [];
  public initLoading = false;

  get userName(): AbstractControl | null {
    return this.date.get('userName');
  }
  get email(): AbstractControl | null {
    return this.date.get('email');
  }
  get password(): AbstractControl | null {
    return this.date.get('password');
  }
  get password_rep(): AbstractControl | null {
    return this.date.get('password_rep');
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
  //#endregion

  constructor(
    private userService: UserService,
    public comuUser: UserCOMService
  ) {
    this.date = this.validatorsDate();
  }
  ngOnDestroy(): void {
    this.clientesSubscription.forEach((sub: any) => sub.unsubscribe());
  }
  ngOnInit(): void {}
  sendDate(): void {
    this.initLoading = true;
    const subscribe = this.userService
      .ADD_USER(
        this.name?.value,
        this.nametwo?.value,
        this.lastnameone?.value,
        this.lastnametwo?.value,
        this.email?.value,
        this.userName?.value,
        this.password?.value
      )
      .subscribe(
        () => {
          this.date.reset();
          this.initLoading = false;
        },
        () => {
          this.date.reset();
          this.initLoading = false;
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
          Validators.pattern(UserName_Pattern),
          Validators.minLength(3),
          Validators.maxLength(70),
        ],
        [ValidatorsUser.asyncuser_AddValidator(this.userService)]
      ),
      email: new FormControl(
        null,
        [Validators.required, Validators.pattern(email_Pattern)],
        [ValidatorsUser.asyncuserEmail_AddValidator(this.userService)]
      ),
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(Names_Pattern),
        Validators.minLength(3),
        Validators.maxLength(70),
      ]),
      nametwo: new FormControl(null, [
        Validators.pattern(Names_Pattern),
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      lastnameone: new FormControl(null, [
        Validators.required,
        Validators.pattern(Names_Pattern),
        Validators.minLength(3),
        Validators.maxLength(70),
      ]),
      lastnametwo: new FormControl(null, [
        Validators.required,
        Validators.pattern(Names_Pattern),
        Validators.minLength(3),
        Validators.maxLength(70),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      password_rep: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        ValidatorsUser.password_EqualsValidator(),
      ]),
    });
  }
}
