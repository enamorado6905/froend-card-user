import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CardCOMService } from 'src/app/pages/service/comunication/card.service';
import { CardService } from 'src/app/pages/service/entitis/card.service';
import { UserName_Pattern } from 'src/app/pages/store/validators.const';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
})
export class AddcardComponent implements OnInit, OnDestroy {
  public date: FormGroup;
  public clientesSubscription: Array<Subscription> = [];
  public initLoading = false;
  private photo: any;
  get type(): AbstractControl | null {
    return this.date.get('type');
  }
  get price(): AbstractControl | null {
    return this.date.get('price');
  }
  get descripcion(): AbstractControl | null {
    return this.date.get('descripcion');
  }
  get allcard(): AbstractControl | null {
    return this.date.get('allcard');
  }

  constructor(
    private cardService: CardService,
    public comuCard: CardCOMService
  ) {
    this.date = this.validatorsDate();
  }
  ngOnDestroy(): void {
    this.clientesSubscription.forEach((m) => m.unsubscribe());
  }
  ngOnInit(): void {}
  getPhoto(photo: any): any {
    if (photo) {
      this.photo = photo;
    }
  }
  sendDate(): void {
    this.initLoading = true;
    const subscribe = this.cardService
      .ADD_CARD(
        this.type?.value,
        this.price?.value,
        this.descripcion?.value,
        this.allcard?.value,
        this.photo
      )
      .subscribe(
        () => {
          this.date.reset();
          this.initLoading = false;
        },
        () => {
          this.date.reset();
          this.initLoading = false;
        }
      );
    this.clientesSubscription.push(subscribe);
  }
  private validatorsDate(): FormGroup {
    return new FormGroup({
      type: new FormControl(null, [
        Validators.required,
        Validators.pattern(UserName_Pattern),
        Validators.minLength(3),
        Validators.maxLength(70),
      ]),
      price: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      allcard: new FormControl(null, [Validators.required]),
    });
  }
}
