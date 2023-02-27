import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var Stripe: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  checkoutForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.checkoutForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      expDate: ['', Validators.required],
      cvc: ['', Validators.required],
      amount: [0, Validators.required],
    });
  }

  stripe: any;
  card: any;

  ngOnInit() {
    this.stripe = Stripe(
      'pk_test_51MfpNjI2RlxJ9P4GNVq5kaockeoHSVCfFt3C56hSzfD2CqcSO9DxH0zPZHHlKG8jIWEoETLMHwbc3bLs3LUuTNIn00ekEGLwgM'
    );
    /*     this.card = this.stripe.elements().create('card');
    this.card.mount('#card-element');  */
  }

  submitOrder() {
    this.router.navigate(['/map']);
  }

  processPayment() {
    const card = {
      number: this.checkoutForm.controls['cardNumber'].value,
      expMonth: parseInt(this.checkoutForm['expDate'].value.split('/')[0], 10),
      expYear: parseInt(this.checkoutForm['expYear'].value.split('/')[1], 10),
      cvc: this.checkoutForm['cvc'].value,
    };

    this.stripe
      .createCardToken(card)
      .then((token) => {
        // Send the token to your server to process the payment
        console.log(token);
        const amount = this.checkoutForm.value.amount * 100; // Amount in cents
        const data = { token: token.id, amount };
        // Call your API to process the payment with the token and amount
      })
      .catch((error) => console.error(error));
  }

  onSubmit() {
    this.stripe.createToken(this.card).then((result) => {
      if (result.error) {
        console.log(result.error.message);
      } else {
        console.log(result.token.id);
        // Submit the token to your server to process the payment
      }
    });
  }
}
