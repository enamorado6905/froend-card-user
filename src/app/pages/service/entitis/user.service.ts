import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAlert } from 'src/app/pages/interfaces/component/alert';
import { User } from '../../interfaces/entitis/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  uri = 'api/USER/';
  constructor(private http: HttpClient) {}

  // #region Crup ADM
  ADD_USER(
    name: string,
    nametwo: string,
    lastnameone: string,
    lastnametwo: string,
    email: string,
    user: string,
    password: string
  ): Observable<IAlert> {
    const fd = {
      name,
      nametwo,
      lastnameone,
      lastnametwo,
      email,
      user,
      password,
    };
    return this.http.post<IAlert>(
      environment.CONTACT_URL + this.uri + 'user',
      fd
    );
  }
  GET_ADMS(limit: number, max: number): Observable<User[]> {
    const params = new HttpParams()
      .set('limit', `${limit}`)
      .set('max', `${max}`);
    return this.http.get<User[]>(environment.CONTACT_URL + this.uri + 'users', {
      params,
    });
  }
  GET_ADM(_id: string): Observable<User> {
    return this.http.get<User>(
      environment.CONTACT_URL + this.uri + 'users/' + _id
    );
  }
  GET_ADM_DELETE(id: string): Observable<User> {
    return this.http.get<User>(
      environment.CONTACT_URL + this.uri + 'getdatedelete' + '/' + id
    );
  }
  GET_ADM_DELETES(ids: Set<string>): Observable<User[]> {
    const fd = { ids };
    return this.http.post<User[]>(
      environment.CONTACT_URL + this.uri + 'getdatedeletes',
      fd
    );
  }
  GET_ADM_token(): Observable<User> {
    const fd = { authtoken: localStorage.getItem('token') };
    return this.http.post<User>(
      environment.CONTACT_URL + this.uri + 'user/token',
      fd
    );
  }
  DELETE_ADM(ids: string[]): Observable<IAlert> {
    const fd = { ids };
    return this.http.post<IAlert>(
      environment.CONTACT_URL + this.uri + 'deleteuser',
      fd
    );
  }
  EDIT_ADM(_id: string, name: string, user: string): Observable<IAlert> {
    const fd = { _id, name, user };
    return this.http.patch<IAlert>(
      environment.CONTACT_URL + this.uri + 'user',
      fd
    );
  }
  EDIT_PASSWORD_ADM(
    id: string,
    password_old: string,
    password_new: string
  ): Observable<IAlert> {
    const fd = { password_old, password_new };
    return this.http.put<IAlert>(
      environment.CONTACT_URL + this.uri + 'editpasword/' + id,
      fd
    );
  }
  EDIT_ROL_ADM(id: string, rol: string): Observable<IAlert> {
    const fd = { rol };
    return this.http.patch<IAlert>(
      environment.CONTACT_URL + this.uri + 'editrol/' + id,
      fd
    );
  }
  EDIT_PERMISSIONS_ADM(id: string, permissions: string): Observable<IAlert> {
    const fd = { permissions };
    return this.http.patch<IAlert>(
      environment.CONTACT_URL + this.uri + 'editpermissions/' + id,
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
  VALIDATORS_USER_ADD(user: string): Observable<boolean> {
    const fd = { user };
    return this.http.post<boolean>(
      environment.CONTACT_URL + this.uri + 'validatoruser',
      fd
    );
  }
  VALIDATORS_USER_EDIT(id: string, user: string): Observable<boolean> {
    const fd = { user };
    return this.http.post<boolean>(
      environment.CONTACT_URL + this.uri + 'validatoruser/' + id,
      fd
    );
  }
  VALIDATORS_EMAIL_ADD(email: string): Observable<boolean> {
    const fd = { email };
    return this.http.post<boolean>(
      environment.CONTACT_URL + this.uri + 'validatoremail' + '/',
      fd
    );
  }
  VALIDATORS_EMAIL_EDIT(id: string, email: string): Observable<boolean> {
    const fd = { email };
    return this.http.post<boolean>(
      environment.CONTACT_URL + this.uri + 'validatoremail/' + id,
      fd
    );
  }
  //#endregion

  //#region SEARCH
  SEARCH_All(paramSearch: string, limit: number, max: number): Observable<any> {
    let object: { User: User[]; alluser: number } = {
      User: [],
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
  SEARCH_NAME(
    paramSearch: string,
    limit: number,
    max: number
  ): Observable<any> {
    const params = new HttpParams()
      .set('limit', `${limit}`)
      .set('max', `${max}`);
    return this.http.get<any>(
      environment.CONTACT_URL + this.uri + 'searchnames/' + paramSearch,
      { params }
    );
  }
  SEARCH_LASTNAMES(
    paramSearch: string,
    limit: number,
    max: number
  ): Observable<any> {
    const params = new HttpParams()
      .set('limit', `${limit}`)
      .set('max', `${max}`);
    return this.http.get<any>(
      environment.CONTACT_URL + this.uri + 'searchnames/' + paramSearch,
      { params }
    );
  }
  SEARCH_USER(
    paramSearch: string,
    limit: number,
    max: number
  ): Observable<any> {
    const params = new HttpParams()
      .set('limit', `${limit}`)
      .set('max', `${max}`);
    return this.http.get<any>(
      environment.CONTACT_URL + this.uri + 'searchUser' + '/' + paramSearch,
      { params }
    );
  }
  SEARCH_EMAIL(
    paramSearch: string,
    limit: number,
    max: number
  ): Observable<any> {
    const params = new HttpParams()
      .set('limit', `${limit}`)
      .set('max', `${max}`);
    return this.http.get<any>(
      environment.CONTACT_URL + this.uri + 'searchEmail' + '/' + paramSearch,
      { params }
    );
  }
  SEARCH_ROL(paramSearch: string, limit: number, max: number): Observable<any> {
    const params = new HttpParams()
      .set('limit', `${limit}`)
      .set('max', `${max}`);
    return this.http.get<any>(
      environment.CONTACT_URL + this.uri + 'searchRol' + '/' + paramSearch,
      { params }
    );
  }
  SEARCH_DATE(
    paramSearch: string,
    limit: number,
    max: number
  ): Observable<any> {
    const params = new HttpParams()
      .set('limit', `${limit}`)
      .set('max', `${max}`);
    return this.http.get<any>(
      environment.CONTACT_URL + this.uri + 'searchDateadd' + '/' + paramSearch,
      { params }
    );
  }
  //#endregion
}
