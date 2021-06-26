import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NZConfZorroService } from 'src/app/core/ng-zorro/nz-conf-zorro.service';
import { CardCOMService } from 'src/app/pages/service/comunication/card.service';
import { CardService } from 'src/app/pages/service/entitis/card.service';
import {
  Names_Pattern,
  UserName_Pattern,
} from 'src/app/pages/store/validators.const';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/pages/interfaces/entitis/card.interface';

@Component({
  selector: 'app-editcard',
  templateUrl: './editcard.component.html',
})
export class EditcardComponent implements OnInit {
  public date: FormGroup;
  public datePhoto: FormGroup;
  public clientesSubscription: Array<Subscription> = [];
  public initLoading = false;
  //private photo: any;
  public card: Card | undefined;
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
  get photo(): AbstractControl | null {
    return this.datePhoto.get('photo');
  }

  constructor(
    private cardService: CardService,
    public comuCard: CardCOMService,
    public nzZorro: NZConfZorroService
  ) {
    this.date = this.validatorsDate();
    this.datePhoto = this.validatorsDatePhoto();
    this.clientesSubscription.push(this.comuCard.subcribeLayoutChanges());
  }
  ngOnDestroy(): void {}
  destroy(): void {
    this.clientesSubscription.forEach((sub: any) => sub.unsubscribe());
    this.comuCard.openOperation = false;
    this.comuCard.openListDate();
  }
  ngOnInit(): void {
    this.getDate();
  }
  getPhoto(photo: any): any {
    if (photo) {
      this.photo?.setValue(photo);
    }
  }
  private getDate(): void {
    this.initLoading = true;
    if (!this.comuCard.IDManageList) {
      return this.destroy();
    }
    const subscribe = this.cardService
      .GET_CARD(this.comuCard.IDManageList)
      .subscribe(
        (res: Card) => {
          this.card = res;
          this.type?.setValue(res.type);
          this.allcard?.setValue(res.allcard);
          this.price?.setValue(res.price);
          this.descripcion?.setValue(res.description);
          this.initLoading = false;
        },
        () => {
          this.destroy();
        }
      );
    this.clientesSubscription.push(subscribe);
  }
  sendDate(): void {
    this.initLoading = true;
    const subscribe = this.cardService
      .EDIT_CARD(
        this.comuCard.IDManageList!,
        this.type?.value,
        this.price?.value,
        this.descripcion?.value,
        this.allcard?.value
      )
      .subscribe(
        () => {
          this.date.reset();
          this.initLoading = false;
          this.getDate();
          this.comuCard.subjectOperation.next();
        },
        () => {
          this.date.reset();
          this.initLoading = false;
        }
      );
    this.clientesSubscription.push(subscribe);
  }
  sendDatePhoto(): void {
    this.initLoading = true;
    const subscribe = this.cardService
      .EDIT_PHOTO(this.comuCard.IDManageList!, this.photo?.value)
      .subscribe(
        () => {
          this.date.reset();
          this.initLoading = false;
          this.getDate();
          this.comuCard.subjectOperation.next();
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
        Validators.pattern(Names_Pattern),
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
  private validatorsDatePhoto(): FormGroup {
    return new FormGroup({
      photo: new FormControl(null, [Validators.required]),
    });
  }
}
