import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root',
})
export class VerifyTokenService {
  public refreshToking: boolean = false;
  public refreshToken: Subject<any> = new Subject<any>();
  constructor(
    private http: HttpClient,
    private router: Router,
    private translate: TranslateService,
    private message: MessageService
  ) {}
  tologin(token: string, token_ref: string, id: string) {
    localStorage.setItem('TOKEN', token);
    localStorage.setItem('TOKEN_REF', token_ref);
    localStorage.setItem('ID', id);
    // this.refreshToking = true;
  }
  isToken(): boolean {
    return (
      !!localStorage.getItem('TOKEN_REF') &&
      !!localStorage.getItem('TOKEN') &&
      !!localStorage.getItem('ID')
    );
  }
  logoutToken(): void {
    localStorage.removeItem('TOKEN_REF')!;
    localStorage.removeItem('TOKEN')!;
    localStorage.removeItem('ID')!;
    this.refreshToking = false;
    this.router.navigate(['/login']);
    this.translate
      .get(`notification.tab-block-seccion`)
      .subscribe((message: string) => {
        this.message.createMessageInfo(message);
      });
  }
  getAccessToken(): string | null {
    return localStorage.getItem('TOKEN');
  }
  setAccessToken(accessToken: string): void {
    localStorage.setItem('TOKEN', accessToken);
  }
  getRefresToken(): string | null {
    return localStorage.getItem('TOKEN_REF');
  }
  getIDUser(): string | null {
    return localStorage.getItem('ID');
  }
  getNewAccessToken(): Observable<any> {
    return this.http
      .get(environment.CONTACT_URL + `auth/refresh`, {
        headers: { token_ref: this.getRefresToken()! },
        observe: 'response',
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          this.setAccessToken(res.body.token);
        })
      );
  }
}
