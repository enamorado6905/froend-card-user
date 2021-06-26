import { Injectable, Injector } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponseBase,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, mergeMap, retry, switchMap, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { VerifyTokenService } from 'src/app/pages/service/configuration/auth/verify_token.service';
import { NotificationService } from 'src/app/pages/service/configuration/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthorizationService } from 'src/app/core/authorization/rol.authorization';
/**
 * Prefixes all requests with `environment.baseUrl`.
 */

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private translate: TranslateService,
    private http: HttpClient,
    private verifyToken: VerifyTokenService,
    private auth: AuthorizationService
  ) {}
  private get notification(): NotificationService {
    return this.injector.get(NotificationService);
  }
  private goTo(url: string): void {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }
  private checkStatus(ev: HttpResponseBase): void {
    let subscribe: any;
    switch (ev.status) {
      case 0:
        subscribe = this.translate
          .get('notification.operation-error')
          .subscribe((res: string) => {
            this.notification.createNotificationError(res);
          });
        break;
      case 200:
        break;
      case 201:
        console.log(ev);
        switch (ev.url) {
          case `${environment.CONTACT_URL}auth/loginadm`:
            subscribe = this.translate
              .get('login.message-valid-credentials', { user: `Orlando` })
              .subscribe((res: string) => {
                this.notification.createNotificationSuccess(res);
              });
            break;
          case `${environment.CONTACT_URL}auth/login`:
            subscribe = this.translate
              .get('login.message-valid-credentials', { user: `Orlando` })
              .subscribe((res: string) => {
                this.notification.createNotificationSuccess(res);
              });
            break;
          default:
            subscribe = this.translate
              .get('notification.operation-success')
              .subscribe((res: string) => {
                this.notification.createNotificationSuccess(res);
              });
            break;
        }
        return;
      case 401:
        switch (ev.url) {
          case `${environment.CONTACT_URL}auth/refresh`:
            subscribe = this.translate
              .get(`login.message-invalid-refresh-token`)
              .subscribe((res: string) => {
                this.notification.createNotificationError(res);
              });
            break;
          case `${environment.CONTACT_URL}auth/loginadm`:
            subscribe = this.translate
              .get(`login.message-invalid-credentials`)
              .subscribe((res: string) => {
                this.notification.createNotificationError(res);
              });
            subscribe?.unsubscribe();
            break;
          case `${environment.CONTACT_URL}auth/login`:
            subscribe = this.translate
              .get(`login.message-invalid-credentials`)
              .subscribe((res: string) => {
                this.notification.createNotificationError(res);
              });
            subscribe?.unsubscribe();
            break;
          default:
            break;
        }
        break;
      case 403:
        subscribe = this.translate
          .get('notification.operation-error')
          .subscribe((res: string) => {
            this.notification.createNotificationError(res);
          });
        break;
      case 500:
        subscribe = this.translate
          .get('notification.operation-error')
          .subscribe((res: string) => {
            this.notification.createNotificationError(res);
          });
        break;
      default:
        break;
    }
    subscribe?.unsubscribe();
  }
  private tryRefreshToken(): Observable<any> {
    if (this.verifyToken.refreshToking) {
      return new Observable((observer) => {
        this.verifyToken.refreshToken.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.verifyToken.refreshToking = true;
      return this.verifyToken.getNewAccessToken().pipe(
        tap((res) => {
          this.verifyToken.refreshToking = false;
          this.verifyToken.refreshToken.next(res);
        })
      );
    }
  }
  private handleData(
    ev: HttpResponseBase,
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    this.checkStatus(ev);
    switch (ev.status) {
      case 0:
        this.goTo('/500');
        console.warn(ev);
        return throwError(ev);
      case 200:
        console.log('200');
        break;
      case 401:
        switch (ev.url) {
          case `${environment.CONTACT_URL}auth/refresh`:
            this.verifyToken.logoutToken();
            console.warn(ev);
            return throwError(ev);
          case `${environment.CONTACT_URL}auth/loginadm`:
            return throwError(ev);
          case `${environment.CONTACT_URL}auth/login`:
            return throwError(ev);
          default:
            return this.tryRefreshToken().pipe(
              switchMap(() => {
                req = this.addAutHeader(req);
                this.auth.RE_LOAD_ROL_PERMISSIONS();
                return next.handle(req);
              }),
              catchError((err: any) => {
                console.warn(ev);
                return throwError(err);
              })
            );
        }
      case 500:
        this.goTo('/500');
        console.warn(ev);
        return throwError(ev);
    }
    if (ev instanceof HttpErrorResponse) {
      return throwError(ev);
    } else {
      return of(ev);
    }
  }
  private addAutHeader(req: HttpRequest<any>): HttpRequest<any> {
    let url = req.url;
    if (
      !url.startsWith('https://') &&
      !url.startsWith('http://') &&
      !url.startsWith('assets/tmp/i18n/')
    ) {
      url = environment.CONTACT_URL + url;
    }
    let token = this.verifyToken.getAccessToken();
    if (token) {
      return req.clone({
        setHeaders: {
          url,
          authtoken: `${token}`,
        },
      });
    } else {
      return req;
    }
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = this.addAutHeader(req);
    return next.handle(req).pipe(
      mergeMap((ev) => {
        if (ev instanceof HttpResponseBase) {
          return this.handleData(ev, req, next);
        } else {
          return of(ev);
        }
      }),
      catchError((err: HttpErrorResponse) => {
        return this.handleData(err, req, next);
      })
    );
  }
}
