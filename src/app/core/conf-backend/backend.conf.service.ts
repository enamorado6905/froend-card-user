import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IAlert } from '../../pages/interfaces/component/alert';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageService } from '../../pages/service/configuration/message/message.service';
//import { Content } from '@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root',
})
export class BackendConfService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private message: MessageService
  ) {}

  _StatusBackEnd(): Observable<IAlert> {
    return this.http.get<IAlert>(environment.CONTACT_URL + 'status');
  }
  StatusBackEnd() {}
}
