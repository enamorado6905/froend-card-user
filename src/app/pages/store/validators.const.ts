import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  ValidatorFn,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, finalize, map, take } from 'rxjs/operators';
import { UserADMService } from '../service/entitis/userADM.service';
import { UserService } from '../service/entitis/user.service';

export var email_Pattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export var UserName_Pattern = /^([a-z]{1}[a-z0-9_]+[\s]*)+$/;
export var Names_Pattern = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/;

export function validateSize_idArtist_ADDEvent(
  arr: FormArray | null
): [key: string] | any {
  return !arr || arr.length > 1 || arr.length === 0
    ? {
        invalidSize: true,
      }
    : null;
}

export class ValidatorsUser {
  static isPresent(obj: any): boolean {
    return obj !== undefined && obj !== null;
  }
  // User
  static asyncuser_EditValidator(
    id: string,
    userservice: UserService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => {
      return userservice.VALIDATORS_USER_EDIT(id, control.value).pipe(
        map((res) => {
          return res && res === true ? { asyncuservalidator: true } : null;
        }),
        take(1),
        finalize(() => {}),
        catchError((): any => {
          return { asyncuservalidator: true };
        })
      );
    };
  }
  static asyncuser_AddValidator(userservice: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => {
      return userservice.VALIDATORS_USER_ADD(control.value).pipe(
        map((res) => {
          return res && res === true ? { asyncuservalidator: true } : null;
        }),
        take(1),
        catchError((): any => {
          return { asyncuservalidator: true };
        })
      );
    };
  }
  static asyncuserEmail_EditValidator(
    id: string,
    userservice: UserService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => {
      return userservice.VALIDATORS_EMAIL_EDIT(id, control.value).pipe(
        map((res) => {
          return res && res === true ? { asyncemailvalidator: true } : null;
        }),
        take(1),
        finalize(() => {}),
        catchError((): any => {
          return { asyncemailvalidator: true };
        })
      );
    };
  }
  static asyncuserEmail_AddValidator(
    userservice: UserService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => {
      return userservice.VALIDATORS_EMAIL_ADD(control.value).pipe(
        map((res) => {
          return res && res === true ? { asyncemailvalidator: true } : null;
        }),
        take(1),
        finalize(() => {}),
        catchError((): any => {
          return { asyncemailvalidator: true };
        })
      );
    };
  }
  // User
  // ADM
  static asyncUser_EditValidator(
    id: string,
    userservice: UserADMService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => {
      return userservice.VALIDATORS_USER_EDIT(id, control.value).pipe(
        map((res) => {
          return res && res === true ? { asyncuservalidator: true } : null;
        }),
        take(1),
        finalize(() => {}),
        catchError((): any => {
          return { asyncuservalidator: true };
        })
      );
    };
  }
  static asyncUser_AddValidator(userservice: UserADMService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => {
      return userservice.VALIDATORS_USER_ADD(control.value).pipe(
        map((res) => {
          return res && res === true ? { asyncuservalidator: true } : null;
        }),
        take(1),
        catchError((): any => {
          return { asyncuservalidator: true };
        })
      );
    };
  }
  static asyncEmail_EditValidator(
    id: string,
    userservice: UserADMService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => {
      return userservice.VALIDATORS_EMAIL_EDIT(id, control.value).pipe(
        map((res) => {
          return res && res === true ? { asyncemailvalidator: true } : null;
        }),
        take(1),
        finalize(() => {}),
        catchError((): any => {
          return { asyncemailvalidator: true };
        })
      );
    };
  }
  static asyncEmail_AddValidator(
    userservice: UserADMService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => {
      return userservice.VALIDATORS_EMAIL_ADD(control.value).pipe(
        map((res) => {
          return res && res === true ? { asyncemailvalidator: true } : null;
        }),
        take(1),
        finalize(() => {}),
        catchError((): any => {
          return { asyncemailvalidator: true };
        })
      );
    };
  }
  //ADM
  static password_EqualsValidator(): ValidatorFn {
    return (control: AbstractControl): [key: string] | any => {
      if (!control?.value || !control.parent?.get('password')?.value) {
        return null;
      } else if (control.value !== control.parent.get('password')?.value) {
        return { password_equalsvalidator: true };
      } else {
        return null;
      }
    };
  }
}
