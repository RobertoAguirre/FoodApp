import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PaymentComponent } from './payment.component';
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  declarations: [PaymentComponent],
  exports: [PaymentComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaymentComponentModule {}
