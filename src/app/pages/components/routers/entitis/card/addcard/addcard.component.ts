import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { CardService } from 'src/app/pages/service/entitis/card.service';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
})
export class AddcardComponent implements OnInit {
  @Input() id: any;
  public date!: FormGroup;
  get amount(): AbstractControl | null {
    return this.date.get('amount');
  }
  get email(): AbstractControl | null {
    return this.date.get('email');
  }
  public isVisible = false;
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };
  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };
  constructor(
    private cardService: CardService,
    private stripeService: StripeService
  ) {
    this.date = this.validatorsDate();
  }
  ngOnInit(): void {}
  private validatorsDate(): FormGroup {
    return new FormGroup({
      amount: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
    });
  }
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    if (this.date.valid) {
      this.cardService
        .PaymentIntent(
          this.email?.value,
          this.amount?.value,
          localStorage?.getItem('ID')!,
          this.id
        )
        .pipe(
          switchMap((pi) =>
            this.stripeService.confirmCardPayment(pi?.client_secret!, {
              payment_method: {
                card: this.card.element,
                billing_details: {
                  name: this.email?.value,
                },
              },
            })
          )
        )
        .subscribe((result) => {
          if (result.error) {
            console.log(result.error.message);
          } else {
            if (result.paymentIntent?.status === 'succeeded') {
            }
          }
        });
    } else {
      console.log(this.date);
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
