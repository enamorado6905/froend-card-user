import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserADMCOMService } from 'src/app/pages/service/comunication/userADM.service';
import { UserADMService } from 'src/app/pages/service/entitis/userADM.service';
import { RolADMService } from 'src/app/pages/service/entitis/rolADM.service';
import {
  ValidatorsUser,
  UserName_Pattern,
  Names_Pattern,
  email_Pattern,
} from 'src/app/pages/store/validators.const';
import { Subscription } from 'rxjs';

@Component({
  selector: 'src-adduseradm',
  templateUrl: './adduseradm.component.html',
})
export class AdduseradmComponent implements OnInit, OnDestroy {
  public loadingDateButton = false;
  public listOfRol: any = [];
  private clientesSubscription: Array<Subscription> = [];
  //#region Form controls
  public date!: FormGroup;
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
  get rol(): AbstractControl | null {
    return this.date.get('rol');
  }
  //#endregion

  constructor(
    private userADM: UserADMService,
    public comuADM: UserADMCOMService,
    private rolADM: RolADMService
  ) {
    this.date = this.validatorsDate();
  }
  ngOnDestroy(): void {
    this.clientesSubscription.forEach((sub: any) => sub.unsubscribe());
  }
  ngOnInit(): void {
    this.getRol();
  }
  getRol(): void {
    this.listOfRol = this.rolADM.GET_ROLS_ADDUSER();
  }
  sendDate(): void {
    this.loadingDateButton = true;
    const subscribe = this.userADM
      .ADD_ADM(
        this.name?.value,
        this.nametwo?.value,
        this.lastnameone?.value,
        this.lastnametwo?.value,
        this.email?.value,
        this.rol?.value,
        this.userName?.value,
        this.password?.value
      )
      .subscribe(
        () => {
          this.date.reset();
          this.loadingDateButton = false;
        },
        () => {
          this.date.reset();
          this.loadingDateButton = false;
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
        [ValidatorsUser.asyncUser_AddValidator(this.userADM)]
      ),
      email: new FormControl(
        null,
        [Validators.required, Validators.pattern(email_Pattern)],
        [ValidatorsUser.asyncEmail_AddValidator(this.userADM)]
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
      rol: new FormControl(null, [Validators.required]),
    });
  }
}
