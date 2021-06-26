import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
} from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { VerifyTokenService } from '../../service/configuration/auth/verify_token.service';

@Injectable({
  providedIn: 'root',
})
export class VerifyTokenGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private verifyToken: VerifyTokenService
  ) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state, nextState);
  }
  canActivate(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean {
    if (this.verifyToken.isToken() === true) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
