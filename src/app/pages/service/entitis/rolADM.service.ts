import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RolADM } from '../../interfaces/entitis/rol.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RolADMService {
  uri = 'api/ROL/';
  constructor(private http: HttpClient) {}

  GET_ROLS_ADDUSER(): Observable<RolADM[]> {
    return this.http.get<RolADM[]>(environment.CONTACT_URL + this.uri + 'adduserrols');
  }
  GET_ROLS(): Observable<RolADM[]> {
    return this.http.get<RolADM[]>(environment.CONTACT_URL + this.uri + 'rols');
  }
  GET_ROL(id: string): Observable<RolADM> {
    return this.http.get<RolADM>(
      environment.CONTACT_URL + this.uri + `roles/${id}`
    );
  }
}
