import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IAlert } from 'app/user/interfaces/component/alert';
import { UserADM } from '../../interfaces/entitis/userADM.interface';
import { environment } from '../../../global/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../configuration/message/message.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class UserADMStatitisService {
  uri = 'statistics/ADM/userADM/';
  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private message: MessageService
  ) {}

  GET_ALL_ADM(): Observable<number> {
    return this.http.get<number>(environment.CONTACT_URL + this.uri + 'date');
  }
}
