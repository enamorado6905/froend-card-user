import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/pages/interfaces/entitis/user.interface';
import { UserCOMService } from 'src/app/pages/service/comunication/user.service';
import { MessageService } from 'src/app/pages/service/configuration/message/message.service';
import { UserService } from 'src/app/pages/service/entitis/user.service';
import {
  ValidatorsUser,
  UserName_Pattern,
  Names_Pattern,
} from 'src/app/pages/store/validators.const';
@Component({
  templateUrl: './date-user.component.html',
  styleUrls: ['./date-user.component.less'],
})
export class InfoUserComponent implements OnInit, OnDestroy {
  //#region Const Photo
  public user: User | undefined;
  public avatarURL: string | undefined;
  public loading = false;
  public progress_photo: number = 0;
  //#endregion

  //#region Const Password
  public loading_password_button = false;
  public load_: boolean = false;

  public status = 'pool';
  public visible = false;
  public passwordProgressMap: {
    [key: string]: 'success' | 'normal' | 'exception';
  } = {
    ok: 'success',
    pass: 'normal',
    pool: 'exception',
  };
  public progress_password = 0;
  //#endregion

  //#region Const Card
  public loading_card_date = true;
  public loading_date_button = false;
  private clientesSubscription: any[] = [];
  //#endregion

  //#region Form controls
  public date: FormGroup;
  public segurity: FormGroup;
  get userName(): AbstractControl | null {
    return this.date.get('userName');
  }
  get email(): AbstractControl | null {
    return this.date.get('email');
  }
  get password_old(): AbstractControl | null {
    return this.segurity.get('password_old');
  }
  get password(): AbstractControl | null {
    return this.segurity.get('password');
  }
  get password_rep(): AbstractControl | null {
    return this.segurity.get('password_rep');
  }
  get name(): AbstractControl | null {
    return this.date.get('name');
  }

  //#endregion

  constructor(private userServie: UserService, public userCOM: UserCOMService) {
    this.date = this.validatorsDate();
    this.segurity = this.validatorsSegurity();
  }
  ngOnDestroy(): void {
    this.clientesSubscription.forEach((item) => item.unsubscribe());
  }
  ngOnInit(): void {
    this.getDate();
    this.checkPassword();
  }
  getDate(): void {
    const subscription = this.userServie
      .GET_USER(localStorage.getItem('ID')!)
      .subscribe(
        (res: User) => {
          this.user = res;
          this.name?.setValue(res.name);
          this.email?.setValue(res.email);
          this.userName?.setValue(res.user);
          for (const i in this.date.controls) {
            this.date.controls[i].markAsDirty();
            this.date.controls[i].updateValueAndValidity();
          }
          this.loading_card_date = false;
        },
        () => {
          this.loading_card_date = false;
        }
      );
    this.clientesSubscription.push(subscription);
  }
  sendDate(): void {
    this.loading_date_button = true;
    const subscription = this.userServie
      .EDIT_USER(
        localStorage.getItem('ID')!,
        this.name?.value,
        this.userName?.value
      )
      .subscribe(
        () => {
          this.loading_date_button = false;
          this.getDate();
        },
        () => {
          this.loading_date_button = false;
          this.getDate();
        }
      );
    this.clientesSubscription.push(subscription);
  }
  sendPassword(): void {
    this.loading_password_button = true;
    const subscription = this.userServie
      .EDIT_PASSWORD_USER(
        localStorage.getItem('ID')!,
        this.password_old?.value,
        this.password?.value
      )
      .subscribe(
        () => {
          this.segurity.reset();
          this.loading_password_button = false;
        },
        () => {
          this.segurity.reset();
          this.loading_password_button = false;
        }
      );
    this.clientesSubscription.push(subscription);
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
        [
          ValidatorsUser.asyncuser_EditValidator(
            localStorage.getItem('ID')!,
            this.userServie
          ),
        ]
      ),
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(Names_Pattern),
        Validators.minLength(3),
        Validators.maxLength(70),
      ]),
    });
  }
  private validatorsSegurity(): FormGroup {
    return new FormGroup({
      password_old: new FormControl(null, [Validators.required]),
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
  private checkPassword(): void {
    this.password?.valueChanges.subscribe((control: string) => {
      if (!control) {
        return;
      }
      this.visible = !!control;
      if (control && control.length > 9) {
        this.status = 'ok';
      } else if (control && control.length > 5) {
        this.status = 'pass';
      } else {
        this.status = 'pool';
      }
      if (this.visible) {
        this.progress_password =
          control.length * 10 > 100 ? 100 : control.length * 10;
      }
    });
  }
}
