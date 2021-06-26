import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAlert } from 'src/app/pages/interfaces/component/alert';
import { UserADM } from '../../interfaces/entitis/userADM.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserADMService {
  uri = 'api/ADM/';
  constructor(private http: HttpClient) {}

  // #region Crup ADM
  ADD_ADM(
    name: string,
    nametwo: string,
    lastnameone: string,
    lastnametwo: string,
    email: string,
    rol: string,
    user: string,
    password: string
  ): Observable<IAlert> {
    const fd = {
      name,
      nametwo,
      lastnameone,
      lastnametwo,
      email,
      rol,
      user,
      password,
    };
    return this.http.post<IAlert>(
      environment.CONTACT_URL + this.uri + 'user',
      fd
    );
  }
  GET_ADMS(limit: number, max: number): Observable<UserADM[]> {
    const params = new HttpParams()
      .set('limit', `${limit}`)
      .set('max', `${max}`);
    return this.http.get<UserADM[]>(
      environment.CONTACT_URL + this.uri + 'users',
      { params }
    );
  }
  GET_ADM(id: string): Observable<UserADM> {
    return this.http.get<UserADM>(
      environment.CONTACT_URL + this.uri + 'users/' + id
    );
  }
  GET_ADM_token(): Observable<UserADM> {
    const fd = { authtoken: localStorage.getItem('token') };
    return this.http.post<UserADM>(
      environment.CONTACT_URL + this.uri + 'user/token',
      fd
    );
  }
  SEARCH_PHOTO(id: string): Observable<any> {
    return this.http.get<any>(
      environment.CONTACT_URL + this.uri + 'photo/' + id
    );
  }
  DELETE_ADM(ids: Array<string>): Observable<any> {
    const config = {
      ids: ids,
    };
    return this.http.post<any>(
      environment.CONTACT_URL + this.uri + 'deleteuser',
      config
    );
  }
  EDIT_ADM(
    _id: string,
    name: string,
    nametwo: string,
    lastnameone: string,
    lastnametwo: string,
    email: string,
    user: string
  ): Observable<IAlert> {
    const fd = { _id, name, nametwo, lastnameone, lastnametwo, email, user };
    return this.http.patch<IAlert>(
      environment.CONTACT_URL + this.uri + 'user',
      fd
    );
  }
  EDIT_PASSWORD_ADM(
    _id: string,
    password_old: string,
    password_new: string
  ): Observable<IAlert> {
    const fd = { _id, password_old, password_new };
    return this.http.patch<IAlert>(
      environment.CONTACT_URL + this.uri + 'editpassword',
      fd
    );
  }
  EDIT_ROL_ADM(_id: string, rol: string): Observable<IAlert> {
    const fd = { _id, rol };
    return this.http.patch<IAlert>(
      environment.CONTACT_URL + this.uri + 'editrol',
      fd
    );
  }
  ADD_PHOTO(id: string, file: any): any {
    const formData = new FormData();
    formData.append('photoadm', file as any); // tslint:disable-next-line:no-any
    const req = new HttpRequest(
      'PATCH',
      environment.CONTACT_URL + this.uri + 'addphoto/' + id,
      formData,
      {
        reportProgress: true,
        withCredentials: false,
        responseType: 'json',
      }
    );
    return this.http.request(req);
  }
  // #endregion

  //#region VALIDATORS
  VALIDATORS_USER_ADD(user_: string): Observable<Boolean> {
    const fd = { user_ };
    return this.http.post<Boolean>(
      environment.CONTACT_URL + this.uri + 'validatorsuser',
      fd
    );
  }
  VALIDATORS_USER_EDIT(id: string, user_: string): Observable<Boolean> {
    const fd = { user_ };
    return this.http.post<Boolean>(
      environment.CONTACT_URL + this.uri + 'validatorsuser/' + id,
      fd
    );
  }
  VALIDATORS_EMAIL_ADD(email: string): Observable<Boolean> {
    const fd = { email };
    return this.http.post<Boolean>(
      environment.CONTACT_URL + this.uri + 'validatorsemail',
      fd
    );
  }
  VALIDATORS_EMAIL_EDIT(id: string, email: string): Observable<Boolean> {
    const fd = { email };
    return this.http.post<Boolean>(
      environment.CONTACT_URL + this.uri + 'validatorsemail/' + id,
      fd
    );
  }
  //#endregion

  SEARCH(paramSearch: string, limit: number, max: number): Observable<any> {
    let object: { UserADM: UserADM[]; alluser: number } = {
      UserADM: [],
      alluser: 0,
    };
    const params = new HttpParams()
      .set('limit', `${limit}`)
      .set('max', `${max}`);
    return this.http.get<any>(
      environment.CONTACT_URL + this.uri + 'searchall' + '/' + paramSearch,
      { params }
    );
  }
}
