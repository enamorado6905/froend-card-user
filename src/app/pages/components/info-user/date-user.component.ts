import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserADM } from 'src/app/pages/interfaces/entitis/userADM.interface';
import { UserADMCOMService } from 'src/app/pages/service/comunication/userADM.service';
import { MessageService } from 'src/app/pages/service/configuration/message/message.service';
import { UserADMService } from 'src/app/pages/service/entitis/userADM.service';
import {
  ValidatorsUser,
  UserName_Pattern,
  Names_Pattern,
  email_Pattern,
} from 'src/app/pages/store/validators.const';
import { NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { Observable, Observer, Subscription } from 'rxjs';
@Component({
  templateUrl: './date-user.component.html',
  styleUrls: ['./date-user.component.less'],
})
export class InfoUserComponent implements OnInit, OnDestroy {
  //#region Const Photo
  public user: UserADM | undefined;
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
    private userADM: UserADMService,
    public userADMCOM: UserADMCOMService,
    private message: MessageService
  ) {
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
    const subscription = this.userADM
      .GET_ADM(localStorage.getItem('ID')!)
      .subscribe(
        (res: UserADM) => {
          this.user = res;
          this.name?.setValue(res.name);
          this.nametwo?.setValue(res.nametwo);
          this.lastnameone?.setValue(res.lastnameone);
          this.lastnametwo?.setValue(res.lastnametwo);
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
    const subscription = this.userADM
      .EDIT_ADM(
        localStorage.getItem('ID')!,
        this.name?.value,
        this.nametwo?.value,
        this.lastnameone?.value,
        this.lastnametwo?.value,
        this.email?.value,
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
    const subscription = this.userADM
      .EDIT_PASSWORD_ADM(
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
          ValidatorsUser.asyncUser_EditValidator(
            localStorage.getItem('ID')!,
            this.userADM
          ),
        ]
      ),
      email: new FormControl(
        null,
        [Validators.required, Validators.pattern(email_Pattern)],
        [
          ValidatorsUser.asyncEmail_EditValidator(
            localStorage.getItem('ID')!,
            this.userADM
          ),
        ]
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
  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.message.createMessageError('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.message.createMessageError('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };
  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }
  handleUpload = (file: NzUploadXHRArgs): Subscription => {
    // Always return a `Subscription` object, nz-upload will automatically unsubscribe at the appropriate time
    const subscription = this.userADM
      .ADD_PHOTO(localStorage.getItem('ID')!, file.file)
      .subscribe(
        (event: any) => {
          if (event.type! === HttpEventType.UploadProgress) {
            if (event.total! > 0) {
              this.progress_photo = (event as any).percent = Math.trunc(
                (event.loaded! / event.total!) * 100
              ); // tslint:disable-next-line:no-any
            }
            // To process the upload progress bar, you must specify the `percent` attribute to indicate progress.
            file.onProgress!(event, file.file);
          } else if (event instanceof HttpResponse) {
            /* success */
            file?.onSuccess!(event.body, file.file, event);
          }
        },
        (err: any) => {
          /* error */
          //this.ava
          file?.onError!(err, file.file);
        }
      );
    this.clientesSubscription.push(subscription);
    return subscription;
  };
  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info?.file?.originFileObj!, () => {
          this.loading = false;
          this.progress_photo = 0;
          this.getDate();
        });
        break;
      case 'error':
        this.loading = false;
        this.progress_photo = 0;
        this.getDate();
        break;
    }
  }
}
