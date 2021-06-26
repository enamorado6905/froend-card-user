import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IAlert } from 'src/app/pages/interfaces/component/alert';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SingInService {
  constructor(private http: HttpClient, private router: Router) {}

  SignInUser(params: string, password: string): Observable<IAlert> {
    const fd = { params, password };
    return this.http.post<IAlert>(environment.CONTACT_URL + 'auth/login', fd);
  }
}
