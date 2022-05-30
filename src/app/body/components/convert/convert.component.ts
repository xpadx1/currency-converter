import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { ApikeyService } from 'src/app/shared/services/apikey.service';
import { CurrencyService } from 'src/app/shared/services/currency.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss']
})
export class ConvertComponent implements OnInit {
  formFrom: FormGroup;
  formTo: FormGroup;
  
  orders: any[] = [];

  amount: number = 0;
  order: string = '';

  currencyRate: number;
  loader = false;

  constructor(private formBuilder: FormBuilder,
    private currencyService: CurrencyService,
    private apiKeyService: ApikeyService
    ) {
      this.formFrom = this.formBuilder.group({
        orders: [''],
        amount: []
      });

      this.formTo = this.formBuilder.group({
        orders: [''],
        amount: []
      });

      this.orders = this.getOrders();
    }

  
  ngOnInit(): void{
  }

  getOrders() {
    const orders = [
      { id: '1', name: 'EUR' },
      { id: '2', name: 'USD' },
      { id: '3', name: 'GBP' },
      { id: '4', name: 'UAH' }
    ];

    return orders;
  }

  submitCurrency() {
    this.sendRequest(true);
  }

  submitAmount(res: 'to' | 'from') {
    if (res === 'from'){
      if(!this.currencyRate) {
        this.sendRequest(true);
        return;
      }
      this.formTo.controls['amount'].setValue((this.currencyRate * this.formFrom.value.amount).toFixed(1), { emitEvent: false, emitViewToModelChange: false });
    }
    else if(res === 'to') {
      if (this.currencyRate) {
        this.formFrom.controls['amount'].setValue((this.formTo.value.amount / this.currencyRate).toFixed(1) , { emitEvent: false, emitViewToModelChange: false });
        return;
      }
    }
  }

  sendRequest(currency: boolean) {
    if (this.formFrom.value.orders && this.formTo.value.orders && this.formFrom.value.amount && currency) {
      this.loader = true;
      this.currencyService.getCurrency(this.apiKeyService.apikey, this.formTo.value.orders, this.formFrom.value.orders, this.formFrom.value.amount)
        .subscribe(res => {
          this.loader = false
          this.currencyRate = res.info.rate;
          this.formTo.controls['amount'].setValue((this.currencyRate * this.formFrom.value.amount).toFixed(1), { emitEvent: false, emitViewToModelChange: false });
        })
    }
  }

}
