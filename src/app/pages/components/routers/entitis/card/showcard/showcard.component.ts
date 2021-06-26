import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzImageService } from 'ng-zorro-antd/image';
import { Subscription } from 'rxjs';
import { NZConfZorroService } from 'src/app/core/ng-zorro/nz-conf-zorro.service';
import { Card } from 'src/app/pages/interfaces/entitis/card.interface';
import { CardCOMService } from 'src/app/pages/service/comunication/card.service';
import { CardService } from 'src/app/pages/service/entitis/card.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-showcard',
  templateUrl: './showcard.component.html',
})
export class ShowcardComponent implements OnInit, OnDestroy {
  public clientesSubscription: Array<Subscription> = [];
  public card: Card | undefined;
  public loadingDate = false;
  constructor(
    private cardService: CardService,
    public comuCard: CardCOMService,
    private nzImageService: NzImageService,
    public nzZorro: NZConfZorroService
  ) {
    this.clientesSubscription.push(this.comuCard.subcribeLayoutChanges());
  }
  ngOnDestroy(): void {}
  destroy(): void {
    this.comuCard.openOperation = false;
    this.clientesSubscription.forEach((sub: any) => sub.unsubscribe());
    this.comuCard.openListDate();
  }
  ngOnInit(): void {
    this.getDate();
  }
  getDate(): void {
    this.loadingDate = true;
    if (!this.comuCard.IDManageList) {
      return this.ngOnDestroy();
    }
    const subscribe = this.cardService
      .GET_CARD(this.comuCard.IDManageList)
      .subscribe(
        (res: Card) => {
          this.card = res;
          this.loadingDate = false;
        },
        () => {
          this.destroy();
        }
      );
    this.clientesSubscription.push(subscribe);
  }
  showImg(): void {
    let url = '';
    if (!this.card?.idimgData) {
      url = 'photo/vue.jpg';
    } else {
      url = 'imagen/' + this.card?.idimgData;
    }
    const images = [
      {
        src: environment.CONTACT_URL + url,
        width: '300px',
        height: '300px',
        alt: this.card?.type,
      },
    ];
    this.nzImageService.preview(images, { nzZoom: 1.5, nzRotate: 0 });
  }
}
