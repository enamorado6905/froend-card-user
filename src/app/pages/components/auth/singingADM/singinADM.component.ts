import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VerifyTokenService } from 'src/app/pages/service/configuration/auth/verify_token.service';
import { SingInService } from '../../../service/auth/sing_in/sing_in.service';
import { AuthorizationService } from 'src/app/core/authorization/rol.authorization';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-signinADM',
  templateUrl: './singinADM.component.html',
})
export class SigninADMComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public _signIn: FormGroup;
  public passwordVisible = false;
  private subscribe: Subscription | any;
  get userName() {
    return this._signIn.get('userName');
  }
  get password() {
    return this._signIn.get('password');
  }
  get remember() {
    return this._signIn.get('remember');
  }
  constructor(
    private singInService: SingInService,
    private router: Router,
    private verifyToken: VerifyTokenService,
    private auth: AuthorizationService
  ) {
    this._signIn = this.validators_signIn();
  }
  ngOnDestroy(): void {
    return this.subscribe ? this.subscribe.unsubscribe() : null;
  }
  ngOnInit(): void {
    this.validators_signIn();
  }
  signIn(): void {
    this.isLoading = true;
    for (const i in this._signIn.controls) {
      this._signIn.controls[i].markAsDirty();
      this._signIn.controls[i].updateValueAndValidity();
      if (this._signIn.controls[i].invalid) {
        return;
      }
    }
    this.subscribe = this.singInService
      .SignInUser(this.userName?.value, this.password?.value)
      .subscribe(
        (token: any) => {
          this.verifyToken.tologin(token.token, token.token_ref, token.id);
          this.auth.GET_ROL_PERMISSIONS();
          this._signIn.reset();
          this.router.navigate(['/welcome']);
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
          this._signIn.reset();
        }
      );
  }
  validators_signIn(): FormGroup {
    return new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      remember: new FormControl(true),
    });
  }
}
