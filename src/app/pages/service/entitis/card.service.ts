import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAlert } from 'src/app/pages/interfaces/component/alert';
import { Card } from '../../interfaces/entitis/card.interface';
import { environment } from 'src/environments/environment';
import { PaymentIntent } from '@stripe/stripe-js';

@Injectable({ providedIn: 'root' })
export class CardService {
  uri = 'api/CARD/';
  constructor(private http: HttpClient) {}

  // #region Crup CARD
  ADD_CARD(
    type: string,
    price: number,
    description: string,
    allcard: number,
    file: File
  ): Observable<IAlert> {
    const formData = new FormData();
    formData.append('card', file as any);
    formData.append('type', type);
    formData.append('price', price as any);
    formData.append('description', description);
    formData.append('allcard', allcard as any);
    return this.http.post<IAlert>(
      environment.CONTACT_URL + this.uri + 'card',
      formData
    );
  }
  GET_CARDS(limit: number, max: number): Observable<Card[]> {
    const params = new HttpParams()
      .set('limit', `${limit}`)
      .set('max', `${max}`);
    return this.http.get<Card[]>(environment.CONTACT_URL + this.uri + 'cards', {
      params,
    });
  }
  GET_CARD(_id: string): Observable<Card> {
    return this.http.get<Card>(
      environment.CONTACT_URL + this.uri + 'cards/' + _id
    );
  }
  DELETE_CARD(ids: string[]): Observable<IAlert> {
    const fd = { ids };
    return this.http.post<IAlert>(
      environment.CONTACT_URL + this.uri + 'deletecard',
      fd
    );
  }
  EDIT_CARD(
    _id: string,
    type: string,
    price: number,
    description: string,
    allcard: number
  ): Observable<IAlert> {
    const formData = {
      _id,
      type,
      price,
      description,
      allcard,
    };
    return this.http.patch<IAlert>(
      environment.CONTACT_URL + this.uri + 'card',
      formData
    );
  }
  EDIT_PHOTO(id: string, file: any): any {
    const formData = new FormData();
    formData.append('card', file as any); // tslint:disable-next-line:no-any
    return this.http.patch<IAlert>(
      environment.CONTACT_URL + this.uri + 'editphotocard/' + id,
      formData
    );
  }
  // #endregion

  PaymentIntent(
    email: string,
    price: any,
    user: string,
    card: string
  ): Observable<PaymentIntent> {
    const formData = {
      email,
      price,
      user,
      card,
    };
    return this.http.post<PaymentIntent>(
      environment.CONTACT_URL + 'api/PRICE/price',
      formData
    );
  }

  //#region VALIDATORS
  VALIDATORS_CARD_ADD(card: string): Observable<boolean> {
    const fd = { card };
    return this.http.post<boolean>(
      environment.CONTACT_URL + this.uri + 'validatorcard',
      fd
    );
  }
  VALIDATORS_CARD_EDIT(id: string, card: string): Observable<boolean> {
    const fd = { card };
    return this.http.post<boolean>(
      environment.CONTACT_URL + this.uri + 'validatorcard/' + id,
      fd
    );
  }
  //#endregion

  //#region SEARCH
  SEARCH(paramSearch: string, limit: number, max: number): Observable<any> {
    const params = new HttpParams()
      .set('limit', `${limit}`)
      .set('max', `${max}`);
    return this.http.get<any>(
      environment.CONTACT_URL + this.uri + 'searchnames/' + paramSearch,
      { params }
    );
  }
  //#endregion
}
